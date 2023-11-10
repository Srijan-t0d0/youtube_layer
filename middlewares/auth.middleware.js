import jwt from "jsonwebtoken";
import User from "../models/userModels";

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

// TODO: Change this name please
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
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};


export {
    authenticateJwt,
    exists_in_db_check
}