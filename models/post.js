import mongoose from 'mongoose';
//set blueprints for documents
const postSchema = mongoose.Schema({
    title: String,
    course: String,
    creator: String,
    email: String,
    selectedFile: String,
    userId: String,
    price:String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});
//create model based on Schema
const Post = mongoose.model('Post', postSchema);
export default Post;