const expressValidator = require('express-validator');
const check = expressValidator.check;


module.exports = new class{
    registerValidator(){
        return [
            check('email').isEmail().withMessage('Email is invalid') ,
            check('userName').not().isEmpty().withMessage('Username cant be empty') ,
            check('password').not().isEmpty().withMessage('Password cant be empty') ,
        ]
    }

    loginValidator(){
        return [
            check('email').isEmail().withMessage('Email is invalid') ,
            //check('userName').not().isEmpty().withMessage('Username cant be empty') ,
            check('password').not().isEmpty().withMessage('Password cant be empty') ,
        ]

    }

};