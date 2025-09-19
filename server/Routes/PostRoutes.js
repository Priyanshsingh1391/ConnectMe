import express from 'express';
import {upload} from '../configs/multer.js'
import {protect} from '../middleware/auth.js'
import { addPost, getFeedPosts, likepost } from '../controllers/postController.js';

const postRouter = express.Router();

postRouter.post('/add', upload.array('images',4), protect, addPost)
postRouter.get('/feed', protect, getFeedPosts)
postRouter.post('/like', protect, likepost)


export default postRouter