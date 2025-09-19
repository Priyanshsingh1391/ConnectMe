import express from 'express'
import { getChatMessages, sendMessage, sseController } from '../controllers/messageController.js'
import {protect} from '../middleware/auth.js'
import {upload} from '../configs/multer.js'

const messageRouter = express.Router()

messageRouter.post('/send',protect,upload.single(`image`), sendMessage)
messageRouter.get('/:userId', sseController)


messageRouter.post('/get', protect, getChatMessages)

export default messageRouter