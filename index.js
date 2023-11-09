// index.js
const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('./models/userModels.js');
const app = express();
const port = 3000;

app.use(cors())
app.use(express.json());


const secretKey = 'your-secret-key';

// Middleware to parse JSON
app.use(express.json());

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const exists_in_db_check = async (req, res, next) => {
    const { username } = req.body;
  
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
    
        // Create a new user
        const newUser = new User({
          username,
          password, // Don't worry about password hashing for now
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

app.post('/login', exists_in_db_check , (req,res) => {
    const { username } = req.userFromDb;

    const token = jwt.sign({ username: username, role: req.userFromDb.role }, secretKey, { expiresIn: '1h' });
  
    res.json({ message: 'Login successful', token });
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
