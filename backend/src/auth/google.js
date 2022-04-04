import jwt from "jsonwebtoken";
import { check } from "express-validator";
import { Strategy } from 'passport-google-token';

import { getModel as getUserModel } from '../users/schema.js';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const GoogleStrategy = new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    const User = getUserModel();

    try {
        const email = profile.emails[0].value;

        let googleUser = await User.findOne({
            googleID: profile.id,
        });

        if(!googleUser) { // check if no google user
            const emailUser = await User.findOne({
                email: email,
            });

            if(emailUser) { // check if exists user with email
                return done(null, false);
            }

            googleUser = new User({
                googleID: profile.id,
            });
        }
        console.log(profile._json.picture);
        googleUser.email = email;
        googleUser.name.given = profile.name.givenName;
        googleUser.name.family = profile.name.familyName;
        googleUser.googleProfileImgURL = profile._json.picture;
        await googleUser.save();
        return done(null, googleUser);
    } catch(err) {
        return done(err);
    }
});
export const googleRules = [
    check('access_token').exists(),
];
export async function googleCallback(req, res) {
    const user = req.user;
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);
    res.status(200).json({
        user: req.user.getSafeObject(),
        token: token,
    });
}
