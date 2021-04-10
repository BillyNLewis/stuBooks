import mongoose from 'mongoose';
//set blueprints for documents
const userSchema = mongoose.Schema({
    displayName: String,
    email: String,
    password: String
});
//create model User for users collection in the db based on Schema
const User = mongoose.model('User', userSchema);
export default User;