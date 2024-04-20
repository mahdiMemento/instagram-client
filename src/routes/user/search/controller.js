const autoBind = require('auto-bind');
const controller = require('../../controller');
const config= require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = new (class extends controller{

    async showPost(req , res){
        const userId = await this.User.findOne({userName:req.body.username});
        const user = await this.User.findById(userId);
        const posts = await this.Post.find({userName: userId._id})
        .sort({createdAt : -1}).select('caption likes hashTags comments ');
        
        this.Response({res , data: posts});

    }

    async hashtag(req , res){
        const posts = await this.Post.find({})
        .sort({createdAt:-1}).select('caption likes hashTags comments ');
        const resultPosts = [];
        posts.forEach(post => {
            const tags = post.hashTags;
            tags.forEach(tag =>{
                if(tag == req.body.hashtag){
                    resultPosts.push(post)
                };
            })
        });
        if(resultPosts.length ===0){
            this.Response({res , message: 'there is no post with this hashtag'})
        }
        //resultPosts = resultPosts.sort({createdAt:0});
        this.Response({res , data: resultPosts});
    }
})();