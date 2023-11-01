const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  Title: String,
  Category: String,
  Questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
  Creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  Quiz_pin: Number,
  Created_at: { type: Date, default: Date.now },
  Timer: {
    TimerAvailable: Number,//0 for no, 1 for quiz timer, 2 for per q timer
    TimerDuration: Number,
  },
  Participants: [
    {
      user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      score: Number,
    },
  ],
});

module.exports = mongoose.model('Quiz', quizSchema);
