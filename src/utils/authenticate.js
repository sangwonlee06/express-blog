import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import User from '../models/userModel.js';

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_ACCESSTOKEN_SECRET || 'defaultSecretKey';

const authenticate = (passport) => {
    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId);
                if (user) {
                    console.log(user)
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            } catch (error) {
                return done(error, false);
            }
        })
    );
};

export default authenticate;