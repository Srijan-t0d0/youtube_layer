// index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import uploadRouter from './routes/upload.routes.js';

const app = express();
const port = process.env.PORT;
dotenv.config();

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);
app.use(express.json());

connectDB();

// Basic route
app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

// Routes
app.use('/auth', authRouter);
app.use('/upload', uploadRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
