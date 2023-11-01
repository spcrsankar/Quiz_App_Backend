const express = require('express');
const router = express.Router();
const token=require('../token_authentication');
const recommendataion = require('../recommendation'); 

router.get('/',token,recommendataion.getRecommentation);

module.exports = router;