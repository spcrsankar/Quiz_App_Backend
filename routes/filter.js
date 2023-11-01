const express = require('express');
const router = express.Router();
const filterbyCategory = require('../filter'); 
const token=require('../token_authentication');

router.get('/cateogory/:category',token, filterbyCategory.filterQuizzesByCategory);

module.exports = router;