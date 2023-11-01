const Quiz = require('./models/quiz');


exports.filterQuizzesByCategory = async (req, res) => {
  try {
    const { category } = req.params; 
    let quizzes = await Quiz.find({ Category: category }); 

    res.status(200).json({ quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



