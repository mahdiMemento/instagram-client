const User = require('./../models/user');
const Post = require('./../models/post');



async function unfollowUser(req , res , next){
    const user = await User.findOne({userName:req.body.username});
    const userId = user._id;
    const updatedUser = await User.findByIdAndUpdate(userId ,{$set:{isFollowed: false}});
    const result = updatedUser.save();
    res.send(result);
    next();
}


async function unfollowTag(req , res , next){
    const posts = await Post.find({});
    const resultPosts = posts.filter(post => post.followedTags.includes(req.body.hashtag));
    
    resultPosts.forEach(post =>{

        post.followedTags = post.followedTags.filter(tag => tag !== req.body.hashtag);
        post.save();
    });
    
    res.send('unfollowed');
    next();
}

module.exports = {unfollowUser , unfollowTag};