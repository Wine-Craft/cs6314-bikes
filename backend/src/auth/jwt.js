import { Strategy, ExtractJwt } from 'passport-jwt';

import { getUserModel } from "../users/schema.js";

const strategy = new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
}, async function(token, done) {
    const User = getUserModel();

    try {
        const user = await User.findOne({
            _id: token.id,
        });

        if(!user) {
            return done(null, false);
        }
        return done(null, user);
    } catch(err) {
        return done(err, false);
    }
});

export const JWTStrategy = strategy;