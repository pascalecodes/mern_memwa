import express from 'express';
import {deleteUser, test, updateUser, getUserPosts, getUser} from '../controllers/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/test', test )
router.post('/update/:id', verifyToken, updateUser)
router.delete('/delete/:id', verifyToken, deleteUser)
router.get('/posts/:id', verifyToken, getUserPosts)
router.get('/find/:id', getUser)

export default router;