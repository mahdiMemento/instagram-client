const autoBind = require('auto-bind');
const controller = require('../../controller');
const config= require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { response } = require('express');

module.exports = new (class extends controller{


    async createPost(req ,res){
        const post = new this.Post({
            caption: req.body.caption,
            userName: req.body.userId,
            hashTags: req.body.hashtags,
        });
        await post.save();
        
        res.send('created');
    };

})();