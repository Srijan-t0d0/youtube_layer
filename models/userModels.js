import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['YouTuber', 'Editor'], required: true },
});

const User = mongoose.model('User', userSchema);

export default User