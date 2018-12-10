import mongoose from 'mongoose';
import { hash } from 'bcryptjs';

const userSchema = new mongoose.Schema({
    email: String,
    username: String,
    name: String,
    password: String,
}, {
    timestamps: true //create 'createdAt' and 'updatedAt'
});

userSchema.pre('save', async function (next) {
    if(this.isModified('password')) {
        try {
            this.password = await hash(this.password, 10) //args.password
        }catch(err) {
            next(err);
        }
    }
    next();
});

export default mongoose.model('User', userSchema);