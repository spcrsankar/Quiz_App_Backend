const express = require('express');
const router = express.Router();
const userControl = require('../user_quiz_control'); 
const token=require('../token_authentication');

router.get('/history',token,userControl.quizHistory);
router.get('/myQuizzes',token,userControl.myQuizzes);

module.exports = router;
