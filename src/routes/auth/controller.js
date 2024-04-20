const autoBind = require('auto-bind');
const controller = require('./../controller');
const config= require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = new (class extends controller{
    async register(req , res){
        const userEmail =await this.User.findOne({email: req.body.email});
        const userName =await this.User.findOne({userName: req.body.userName});

        if(userEmail){
            return this.Response({
                res , code:400 , message:"This email already registered."
            });
        };
        if(userName){
            return this.Response({
                res , code:400 , message:"This Username already taken."
            });
        };

        const user = new this.User(_.pick(req.body , ['userName' , 'email' , 'password'])); // واکشی اطلاعات از درخواست

        const salt = await bcrypt.genSalt(10);      //قوی کردن فرآیند هش
        user.password =await bcrypt.hash(user.password , salt);  //هش کردن پسوورد
        await user.save();

        this.Response({
            res , message:"The user successfuiy registered.",
            data: _.pick(user , ['Username' , 'email'])
        });
    };

    
    async login(req , res){
        const user = await this.User.findOne({email:req.body.email});
        if(!user){
            return this.Response({res , code:400 , message: 'invalid Username or password'});
        }
        const isValid = await bcrypt.compare(req.body.password , user.password);
        if(!isValid){
            return this.Response({res , code:400 , message: 'invalid Username or password'});
        }
        const token = jwt.sign({_id:user.id} , config.get('jwt_key'));
        this.Response({res , message:'successfuly logged in' , data:{token}});

    }
})();