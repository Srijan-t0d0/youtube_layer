import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  filePathRaw: { type: String, required: true }, // Path to the raw (uploaded) video file
  filePathEdited: { type: String }, // Path to the edited video file
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedEditor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Video = mongoose.model('Video', videoSchema);

export default Video