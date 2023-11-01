const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  User_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, 
  },
  Quiz_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true, 
  },
  QuestionAnswers: [
    {
      Question_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true, 
      },
      Answer: {
        type: String, 
        required: true,
      },
      Score: {
        type: Number, 
      },
      Completed_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model('Answer', answerSchema);
