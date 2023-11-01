const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  Question_text: String,
  Question_type: Number, // 1 for MCQ, 2 for True/False, 3 for FIB
  Correct_answer: String,
  Explanation: String,
  Score: Number,
  Time: Number,
  Options: [String], // Array of options (used for MCQ),
  //time_limit:number
});

module.exports = mongoose.model('Question', questionSchema);
