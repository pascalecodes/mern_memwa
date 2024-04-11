import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, deletePost, updatePost, getPost, getPosts } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
router.post('/update/:id', verifyToken, updatePost);
router.get('/get/:id', getPost);
router.get('/get', getPosts);

export default router