import jwt from 'jsonwebtoken';
import User from '../models/userModels.js';

const authenticateJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user_Id = user.username;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

// TODO: Change this name please
const exists_in_db_check = async (req, res, next) => {
    const user_Id = req.user_Id;
    try {
        const existingUser = await User.findOne({ user_Id });

        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        req.userFromDb = existingUser;
        next();
    } catch (error) {
        console.error('Error checking user existence:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

export { authenticateJwt, exists_in_db_check };
