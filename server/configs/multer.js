import multer from 'multer'
// using to parse the image and other data
const storage = multer.diskStorage({})

export const upload = multer({storage})