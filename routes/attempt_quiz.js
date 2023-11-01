const express = require('express');
const router = express.Router();
const quizController = require('../attempt_quiz');
const token=require('../token_authentication');

router.post('/:id',token, async (req, res) => {
  const quizId = req.params.id;
  const { userId, answers } = req.body;

  try {
    const result = await quizController.attemptQuiz(quizId, userId, answers, res);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id',token,quizController.displayQuestions);

module.exports = router;
