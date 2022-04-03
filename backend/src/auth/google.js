import { Strategy } from 'passport-google-token';

import { getModel as getUserModel } from '../users/schema.js';
import jwt from "jsonwebtoken";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const domain = process.env.DOMAIN;
const port = process.env.PORT;

const strategy = new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    const User = getUserModel();

    try {
        const email = profile.emails[0].value;

        const googleUser = await User.findOne({
            googleID: profile.id,
        });

        if(!googleUser) { // check if no google user
            const emailUser = await User.findOne({
                email: email,
            });

            if(emailUser) { // check if exists user with email
                return done(null, false);
            }

            const newUser = new User({
                googleID: profile.id,
                username: profile.displayName,
                email: email,
            });
            await newUser.save();
            return done(null, newUser);
        }
        return done(null, googleUser);
    } catch(err) {
        return done(err);
    }


});

const callback = async function(req, res) {
    const user = req.user;
    console.log(user);
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);
    res.status(200).json({
        user: req.user.getSafeObject(),
        token: token,
    });
}

export const GoogleStrategy = strategy;
export const googleCallback = callback;