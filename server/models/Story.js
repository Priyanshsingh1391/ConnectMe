import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    user: {type: String, ref: 'User', required: true},
    content: {type: String},
    media_urls: [{type:String}],
    post_type: {type: String,enum: ['image','text', 'text_with_image'], default: 'image', required:true},
    likes_count :[{type:String, ref: 'User'}],
    
},{timestamps:true, minimize:false})

const Story = mongoose.model('Story', storySchema)

export default Story;