const express = require('express');
const router = express.Router();
const leaderboardController = require('../leaderboard');
const token=require('../token_authentication');


router.get('/:quizId',token, leaderboardController.getLeaderboard);

module.exports = router;