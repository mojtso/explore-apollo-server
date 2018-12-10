import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    name: String,
    password: String,
}, {
    timestamps: true //create 'createdAt' and 'updatedAt'
});

export default mongoose.model('User', userSchema);