// index.js
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('./models/userModels.js');
const Video = require('./models/videoModel.js')
const multer =  require('multer')
const app = express();
const port = 3000;
require('dotenv').config();

app.use(cors())
app.use(express.json());


const secretKey = 'your-secret-key';

const rawStorage = multer.diskStorage({
    destination: 'uploads/raw',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const rawUpload = multer({ storage: rawStorage });
  
  // Set up multer for edited video uploads
  const editedStorage = multer.diskStorage({
    destination: 'uploads/edited',
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const editedUpload = multer({ storage: editedStorage });
  

// Middleware to parse JSON
app.use(express.json());

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log(authHeader)
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      console.log(token)
      jwt.verify(token, secretKey, (err, user) => {
        if (err) {
          console.log(err)
          return res.sendStatus(403);
        }
        req.user = user;
        req.body = {username:user.username}
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const exists_in_db_check = async (req, res, next) => {
    const { username } = req.body;
    console.log(req.body)
    console.log(username)
    try {
      const existingUser = await User.findOne({ username });
  
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      req.userFromDb = existingUser;
      next();
    } catch (error) {
      console.error('Error checking user existence:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.post('/signup' ,async (req , res) => {
    const {username , password , role , email} = req.body
    console.log(req.body)
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
    
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password,10)

        // Create a new user
        const newUser = new User({
          username,
          password:hashedPassword, // Don't worry about password hashing for now
          role,
          email
        });
    
        // Save the new user to the database
        const savedUser = await newUser.save();
        const token = jwt.sign({ username: savedUser.username, role: savedUser.role }, secretKey, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
      
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }


})

app.post('/login', exists_in_db_check , async (req,res) => {
    const { username, password } = req.body;

    try {
        const isPasswordValid = await bcrypt.compare(password, req.userFromDb.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        const token = jwt.sign({ username: username, role: req.userFromDb.role }, secretKey, { expiresIn: '1h' });

        res.json({ message: 'Login successful', token });

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

app.post('/upload/raw',authenticateJwt,exists_in_db_check, rawUpload.single('video'), async (req, res) => {
    try {
      const { title, description } = req.body;
      const filePathRaw = req.file.path; // File path of the raw video
      console.debug(req.userFromDb)
      // Save video metadata in the database
      const newVideo = new Video({
        title,
        description,
        filePathRaw,
        uploadedBy:req.userFromDb._id,
      });
  
      await newVideo.save();
  
      res.status(201).json({ message: 'Raw video uploaded successfully', video: newVideo });
    } catch (error) {
      console.error('Error uploading raw video:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Route for uploading edited video
  app.post('/upload/edited',authenticateJwt,exists_in_db_check, editedUpload.single('video'), async (req, res) => {
    try {
      const { videoId } = req.body;
      const filePathEdited = req.file.path; // File path of the edited video
  
      // Update video metadata in the database
      const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        { filePathEdited },
        { new: true } // Return the updated document
      );
  
      res.status(200).json({ message: 'Edited video uploaded successfully', video: updatedVideo });
    } catch (error) {
      console.error('Error uploading edited video:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
