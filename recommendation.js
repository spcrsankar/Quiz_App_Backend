const {User}=require('./models/user');
const Quiz = require('./models/quiz')


exports.getRecommentation = async (req,res)=> {
  const user_id = req._id

  let user = await User.findById(user_id)
  console.log("get recommendation ",user_id)

  let quizzes = []
  
  if(user.scores.length > 3){

    //group attended by category
    let group = {}

    for(let score of user.scores){
      const quiz = await Quiz.findById(score.Quiz_id,'Category')
      if(group.hasOwnProperty(quiz.Category))  group[quiz.Category] += 1
      else group[quiz.Category] = 1
    }

    let entries = Object.entries(group)

    entries.sort((a,b)=> b[1] - a[1])
    
    for(let entry of entries){
      let category = entry[0]
      const quizzes_category = await Quiz.find({Category:category}).sort({'Participants.length':-1})
      console.log(quizzes_category)
      quizzes = [...quizzes,...quizzes_category]

      if(quizzes.length > 5){
        return res.status(200).json({ quizzes })
      }
    }
    console.log("lesss than 3 only")
    //return quiz based on most participants
    const all_quiz = await Quiz.find({}).sort({'Participants.length':-1}).limit(5)
     console.log("print all quiz")
    console.log(all_quiz)
    quizzes = [...quizzes,...all_quiz]

    return res.status(200).json({ quizzes })
  }
} 
