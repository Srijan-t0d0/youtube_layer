import User from "../models/userModels.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username})
    // Add a check if username or password is provided
    try {
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        console.log(req.userFromDb)
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const registerUser = async (req , res) => {
    const {username , password , role , email} = req.body
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ username });
    
        if (existingUser) {
          return res.status(409).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password,10)

        // Create a new user
        const savedUser = await User.create({
            username,
            password:hashedPassword, // Don't worry about password hashing for now
            role,
            email
        })
        
        const token = jwt.sign({ userId: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User created successfully', token:token });
    }   catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export {
    loginUser, 
    registerUser
}