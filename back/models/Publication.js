const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    post: { type: String },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
    userName: { type: String },
    // comments: {
    //   type: [
    //     {
    //       commenterId: String,
    //       commenterName: String,
    //       text: String,
    //       timestamp: Number,
    //     },
    //   ],
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);

//ajouter userName + userImageUrl
