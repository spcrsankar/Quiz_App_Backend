const express = require('express');
const router = express.Router();
const quizController = require('../attempt_quiz');
const token=require('../token_authentication');

router.post('/:id',token, async (req, res) => {
  const quizId = req.params.id;
  const { answers } = req.body;
  const userId = req._id;
  try {
    await quizController.attemptQuiz(quizId, userId, answers, res);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id',token,quizController.displayQuestions);

module.exports = router;
