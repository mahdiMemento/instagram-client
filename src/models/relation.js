const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Post = require('./post');
const User = require('./user');
this.User=User;

const hashtagSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
});

hashtagSchema.plugin(timestamp);

const Hashtag = mongoose.model('Hashtag', hashtagSchema);

//let relation = new Relation({
//   user: '661a928cff2729b32c509c81',
//    post: '661a93aba8f73a0792f0a85f'
//});

//relation.save();



//getPost('661a928cff2729b32c509c81');

module.exports = Hashtag;