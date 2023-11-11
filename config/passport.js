// passport.js
import { use, serializeUser, deserializeUser } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { sign } from 'jsonwebtoken'; // Import JWT library
import User, { authenticate, serializeUser as _serializeUser, deserializeUser as _deserializeUser, findOne, findById } from './models/user';

use(new LocalStrategy(authenticate()));
serializeUser(_serializeUser());
deserializeUser(_deserializeUser());

use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3001/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  findOne({ googleId: profile.id }, (err, user) => {
    if (err) return done(err);
    if (user) return done(null, user);
    const newUser = new User({
      googleId: profile.id,
      username: profile.displayName
    });
    newUser.save((err) => {
      if (err) return done(err);
      return done(null, newUser);
    });
  });
}));

// JWT strategy
use('jwt', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET // Replace with your secret key
}, (jwt_payload, done) => {
  findById(jwt_payload.sub, (err, user) => {
    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  });
}));

// Generate JWT
function generateToken(user) {
  return sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
}

export default { passport, generateToken };