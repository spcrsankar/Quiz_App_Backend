const Quiz = require('./models/quiz');
const { User } = require('./models/user');
exports.getLeaderboard = async (req, res) => {
  try {
    const quizId = req.params.quizId;
    const quiz = await Quiz.findById(quizId);

    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }

    quiz.Participants.sort((a, b) => b.score - a.score);

    const leaderboard = []

    for(const participant of quiz.Participants){
      const user = await User.findById(participant.user_id)
      leaderboard.push({
        user_id: participant.user_id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        score: participant.score,
      })
    }
    
    // const leaderboard = quiz.Participants.map(async(participant) => {
    //   const user = await User.findById(participant.user_id)
    //   return {
    //     user_id: participant.user_id,
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     score: participant.score,
    //   }
    // });

    res.json(leaderboard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};