import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, deletePost, updatePost, getPost, findPosts, getAllPosts, getByTag, getPostsByUserRef } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
router.post('/update/:id', verifyToken, updatePost);
router.get('/get/:id', getPost);
router.get('/get', findPosts);
router.get('/posts', getAllPosts)
router.get('/tags', getByTag)
router.get('/user/:userRef', getPostsByUserRef)

export default router