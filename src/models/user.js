const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Post = require('./post');
const Relation = require('./relation');


const userSchema = new mongoose.Schema({
    email: {type: String , required: true , unique: true},
    userName: {type: String , required: true , unique: true},
    password: {type: String , required: true},
    posts: { type : mongoose.Schema.Types.ObjectId , ref: "Post" },
    isFollowed: {type: Boolean , default:false }
});

userSchema.plugin(timestamp);

const User = mongoose.model('User',userSchema);

//let user =new User({
    //email: 'user1@gmail.com',
    //userName: 'user1',
    //password: '1',
    //isFollowed: true,
    //posts: '661adecf7d5062bc67c00f74'
//});
//user.save();



module.exports = User;