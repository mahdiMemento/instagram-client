const express = require('express');
const router = express.Router();
const searchRouter = require('./search/index');
const homeRouter = require('./home/index');
const createRouter = require('./create/index');
const controller = require('./controller');

router.use('/search' , searchRouter); 

router.use('/home' , homeRouter);

router.use('/create' , createRouter);




module.exports = router;