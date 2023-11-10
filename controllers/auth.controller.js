import User from "../models/userModels";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    // Add a check if username or password is provided
    try {
        const isPasswordValid = await bcrypt.compare(password, req.userFromDb.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }

        const token = jwt.sign({ username: username, role: req.userFromDb.role }, secretKey, { expiresIn: '1h' });

        return res.status(201).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const registerUser = async (req , res) => {
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
        const savedUser = await User.create({
            username,
            password:hashedPassword, // Don't worry about password hashing for now
            role,
            email
        })
        
        const token = jwt.sign({ username: savedUser.username, role: savedUser.role }, secretKey, { expiresIn: '1h' });

        return res.status(201).json({ message: 'User created successfully', token });
    }   catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export {
    loginUser, 
    registerUser
}