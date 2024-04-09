import express from 'express'
import { verifyToken } from '../utils/verifyUser.js';
import { createPost, deletePost, updatePost } from '../controllers/post.controller.js';

const router = express.Router();

router.post('/create', verifyToken, createPost);
router.delete('/delete/:id', verifyToken, deletePost);
router.post('/update/:id', verifyToken, updatePost);

export default router