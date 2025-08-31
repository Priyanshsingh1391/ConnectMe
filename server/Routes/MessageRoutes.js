import express from 'express'
import { getChatMessages, sseController } from '../controllers/messageController.js'
import {protect} from '../middleware/auth.js'
import {upload} from '../configs/multer.js'

const messageRouter = express.Router()

messageRouter.get('/:userId', sseController)
messageRouter.post('/send', upload.single(`image`),protect)

messageRouter.post('/get', protect, getChatMessages)

export default messageRouter