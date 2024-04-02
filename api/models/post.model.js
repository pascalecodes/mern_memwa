import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  //   required: true,
  //   index:true,
  // },
  caption: {
    type: String,
    required: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    index: true,
  },
  media: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  status: {
    type: Boolean,
    //default: 'false',
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  userRef: {
    type: String,
    required: true,
  },
}, {timestamps: true});

const Post = mongoose.model('Post', PostSchema);

export default Post
