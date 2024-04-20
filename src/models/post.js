const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const User = require('./user');
const Relation = require('./relation');


const postSchema = new mongoose.Schema({
    caption: { type: String },
    likes: { type: Number },
    userName: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    hashTags: { type: Array },
    followedTags: { type: Array },
    comments: { type: Array }
});

postSchema.plugin(timestamp);

const Post = mongoose.model('Post', postSchema);


//let post = new Post({
//likes: 100,
//hashTags:'tag1',
//userName: '661a928cff2729b32c509c81'
//});
//post.save();




module.exports = Post;
