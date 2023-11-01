const express = require('express');
const router = express.Router();
const quizControl = require('../create_quiz');
const token=require('../token_authentication');
const upload = require('../uploadImage'); 

router.post('/create',token, quizControl.createQuiz);
router.get('/',token,quizControl.getAllQuizzes);
router.get('/byId/:id',token,quizControl.getQuizById);
router.get('/byPin/:pin',token,quizControl.getQuizByPin);
router.delete('/delete/:id',token,quizControl.deleteQuizById)

router.post('/upload_quiz/:quiz_id',token,(req,res,next)=>{
    req._id=req.params.quiz_id;
    next();
},upload.single('file'), (req, res) => {
  res.send({"message":'Form data and file received.'});
});


module.exports = router;
