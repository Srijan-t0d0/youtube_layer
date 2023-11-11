import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: false },
    googleId: { type: String },
    role: { type: String, enum: ['YouTuber', 'Editor'], required: false },
});

const User = mongoose.model('User', userSchema);

export default User;
