const Quiz = require('./models/quiz');
const Question = require('./models/questions');
const {User} = require('./models/user');
const Joi = require('joi'); 

async function generateRandom6DigitNumber() {
  const min = 100000;
  const max = 999999;
  let isUnique = false;
  let generatedPin;

  while (!isUnique) {
      generatedPin = Math.floor(Math.random() * (max - min + 1)) + min;
      const existingQuiz = await Quiz.findOne({ Quiz_pin: generatedPin });

      if (!existingQuiz) {
          isUnique = true;
      }
  }

  return generatedPin;
}
exports.createQuiz = async (req, res) => {
    const schema = Joi.object({
      Title: Joi.string().required(),
      Category: Joi.string().required(),
      Timer: Joi.object({
        // TimerAvailable: Joi.boolean().required(),
        // TimerDuration: Joi.number().when('TimerAvailable', {
        //   is: true,
        //   then: Joi.number().required(),
        //   otherwise: Joi.optional(),
        // }),

        TimerAvailable: Joi.number().required(),
        TimerDuration: Joi.number().when('TimerAvailable', {
          is: 1,
          then: Joi.number().required(),
          otherwise: Joi.optional(),
        }),
        
      }).required(),
      Questions: Joi.array().items(
        Joi.object({
          Question_text: Joi.string().required(),
          Question_type: Joi.number().required(),
          Correct_answer: Joi.string().required(),
          Explanation: Joi.string().required(),
          Score: Joi.number().required(),
          Options: Joi.array().items(Joi.string()),
          Time: Joi.number().when('TimerAvailable', {
            is: 2,
            then: Joi.number().required(),
            otherwise: Joi.optional(),
          }),
        })
      ),
      //Creator_id: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { Title, Category, Timer, Questions, Creator_id } = req.body;
  
    try {
      const quiz = new Quiz({
        Title,
        Category,
        Timer,
        Creator_id: req._id,
        Quiz_pin:await generateRandom6DigitNumber(),
      });
  
      for (const questionData of Questions) {
        const question = new Question({
          ...questionData,
        });
        await question.save();
        quiz.Questions.push(question._id);
      }
  
      await quiz.save();
  
    const user = await User.findById(req._id);
    console.log(req._id)
    console.log(user._id)
    user.quizzes_id.push(quiz._id);
    await user.save();
  
      res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.getAllQuizzes = async (req, res) => {
    try {
      const quizzes = await Quiz.find().sort({ Created_at: -1 });
      res.json(quizzes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.getQuizById = async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      const questions = await Question.find({ _id: { $in: quiz.Questions } });

      res.json({
        _id: quiz._id,
        Timer: quiz.Timer,
        Title: quiz.Title,
        Category: quiz.Category,
        Questions:quiz.Questions,
        Creator_id: quiz.Creator_id,
        Quiz_pin: quiz.Quiz_pin,
        Created_at: quiz.Created_at,
        Participants: quiz.Participants,
        total_socre: questions.reduce((acc, curr) => acc + curr.Score, 0),
      })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

  exports.getQuizByPin = async (req, res) => {
    try {
      const { pin } = req.params; 
      const quiz = await Quiz.find({ Quiz_pin: pin }); 
      res.status(200).json({ quiz });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  exports.deleteQuizById = async (req, res) => {
    try {
      const quiz = await Quiz.findById(req.params.id);
      const user=await User.findById(quiz.Creator_id);
      //console.log(user);
      user.quizzes_id.pull(quiz._id);
      await user.save();
      await Question.deleteMany({ _id: { $in: quiz.Questions } });
      const participants = quiz.Participants;
      //console.log(participants);
      if (participants.length>0){
      for (const participant of participants) {
        const user = await User.findById(participant.user_id);
        if (user) {
          user.scores = user.scores.filter((score) => !score.Quiz_id.equals(quiz._id));
          await user.save();
        }
      }
    }
      await Quiz.findByIdAndDelete(req.params.id);
      res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
