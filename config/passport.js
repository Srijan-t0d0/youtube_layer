// passport.js

import User from "../models/userModels.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import jwt from "jsonwebtoken";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
      passReqToCallback: false,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in the database
        let userFromDB = await User.findOne({ googleId: profile.id });

        if (!userFromDB) {
          // If user doesn't exist, create a new user in the database
          userFromDB = new User({
            googleId: profile.id,
            email: profile._json.email,
            // Add other properties based on your User model schema
          });

          // Save the new user to the database
          await userFromDB.save();
        }

        // Generate a JWT token
        const token = jwt.sign(
          { userId: userFromDB._id },
          process.env.JWT_SECRET,
          {
            expiresIn: "1h", // Set an expiration time as needed
          }
        );

        return done(null, { user: userFromDB, token }); // Pass both user and token to the callback
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
