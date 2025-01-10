import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      required: false,
    },
    privacy: {
      type: Boolean,
      required: false,
    },
    mediaUrls: {
      type: Array,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: false,
    },
    likes: {
      type: Number,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
    questionId: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: false,
    },
    type: {
      type: String,
      required:false,
    }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', PostSchema);

export default Post;
