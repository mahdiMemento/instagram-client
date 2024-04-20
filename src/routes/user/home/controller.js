const autoBind = require('auto-bind');
const controller = require('../../controller');
const config= require('config');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = new (class extends controller{


    async usersPosts(req ,res){
        const posts = await this.Post.find().populate('userName' , '_id isFollowed').sort({createdAt:-1})
        .select('likes userName caption hashTags comments');
        const resultPosts = [];

        posts.forEach(post =>{
            if(post.userName.isFollowed === true){
                resultPosts.push(post);
            }
        });        
        
        
        if(resultPosts.length === 0){
            this.Response({res , code:400 , message: 'There is no user who has been followed'});
        }
        this.Response({res , data: resultPosts});
    };



    async hashtag(req , res){

        const posts = await this.Post.find({ followedTags: { $exists: true, $not: { $size: 0 } } })
        .sort({createdAt: -1}).select('likes userName caption hashTags comments');
        if(!posts){
            this.Response({res , message: 'there is no followed hashtag '});
        }
        this.Response({res , data: posts});
    }
})();