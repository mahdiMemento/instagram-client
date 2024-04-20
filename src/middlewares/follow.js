const User = require('./../models/user');
const Post = require('./../models/post');



async function followUser(req , res , next){
    const user = await User.findOne({userName:req.body.username});
    const userId = user._id;
    const updatedUser = User.findByIdAndUpdate(userId ,{$set:{isFollowed: true}});
    const result = updatedUser.save();
    console.log(result);
    next();
}


async function followTag(req , res , next){
    const posts = await Post.find({});
    const resultPosts = [];
    posts.forEach(post =>{
        const tags = post.hashTags;
        tags.forEach(tag =>{
            if (tag == req.body.hashtag){
                resultPosts.push(post);
            }
        });

    });
    resultPosts.forEach(post =>{
        post.followedTags.push(req.body.hashtag);
        post.save();
    
    res.send('followed');
    });

    next();
}

module.exports = {followUser , followTag};