import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";


export const createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(errorHandler(404, 'Post not found'));
  }
  if (req.user.id !== post.userRef) {
    return next(errorHandler(401, 'You can only delete your own post!'));
  }

  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error){
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(errorHandler(404, 'Post not found!'));
  }
  if (req.user.id !== post.userRef) {
    return next(errorHandler(401, 'You can only update your own posts!'));
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return next(errorHandler(404, 'Post not found!'));
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

export const findPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) ;
    const startIndex = parseInt(req.query.startIndex) || 0;
    
    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    const posts = await Post.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { caption: { $regex: searchTerm, $options: 'i' } },
        { tags: { $regex: searchTerm, $options: 'i' } }
      ]
    }).sort(
      {[sort]: order}
    ).limit(limit).skip(startIndex);
    return res.status(200).json(posts);
  } catch (error) {
    next(error);
  }

};

export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  //console.log(tags)
  try {
    const videos = await Post.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};

export const getPostsByUserRef = async (req, res, next) => {
  const { userRef } = req.params; // Extract userRef from request parameters
  try {
    const posts = await Post.find({ userRef }); // Query posts by userRef
    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this user.' });
    }
    res.status(200).json(posts); // Return the found posts
  } catch (error) {
    console.error('Error fetching posts by userRef:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};