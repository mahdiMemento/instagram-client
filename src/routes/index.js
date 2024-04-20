//This file manages all of the routes.

const express = require('express');
const router = express.Router();
const authRouter = require('./auth/index');
const userRouter = require('./user/index');
const error = require('./../middlewares/error'); 
const {isLogined , isAdmin} = require('./../middlewares/auth');

router.use('/auth' , authRouter);
router.use('/user' , isLogined , userRouter);
//isLogined
router.use(error);


module.exports= router;
 
