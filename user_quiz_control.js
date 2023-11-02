const {User}=require('./models/user');
const Quiz=require('./models/quiz')

exports.myQuizzes = async (req,res)=>{
    const user_id = req._id
    let created_quizzes = await Quiz.find({ Creator_id: user_id }).sort({ Created_at: -1 });
    return res.status(200).send(created_quizzes)
  }


  exports.quizHistory = async (req,res)=>{
    const user_id = req._id
    
    let user = await User.findById(user_id)
    console.log(user)
    let obj={}
    let partcipated_quizzes = user.scores.map(quiz => { obj[quiz.Quiz_id] = quiz.Score
      return quiz.Quiz_id
    });
  
    //console.log(partcipated_quizzes);
    const quizzes = await Quiz.find({ _id: { $in: partcipated_quizzes } }).sort({ Created_at: -1 });
    
  
    return res.json({quizzes,obj})
  }