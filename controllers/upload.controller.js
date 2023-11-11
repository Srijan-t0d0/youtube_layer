import Video from "../models/videoModel.js";

const rawUpload = async (req, res) => {
        try {
          const { title, description } = req.body;
          const filePathRaw = req.file.path; // File path of the raw video
          console.debug(req.userFromDb)
          // Save video metadata in the database
          const newVideo = await Video.create({
            title,
            description,
            filePathRaw,
            uploadedBy:req.userFromDb._id,
          })
      
          return res.status(201).json({ message: 'Raw video uploaded successfully', video: newVideo });
        } catch (error) {
          console.error('Error uploading raw video:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    }

const editedUpload = async (req, res) => {
    try {
      const { videoId } = req.body;
      const filePathEdited = req.file.path; // File path of the edited video
  
      // Update video metadata in the database
      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { filePathEdited },
        { new: true } // Return the updated document
      );
  
      return  res.status(200).json({ message: 'Edited video uploaded successfully', video: updatedVideo });
    } catch (error) {
      console.error('Error uploading edited video:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
}


export {
    editedUpload, 
    rawUpload
}