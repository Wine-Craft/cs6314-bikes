import jwt from "jsonwebtoken";
import { check } from "express-validator";
import { Strategy } from 'passport-google-token';

import { getUserModel } from '../users/schema.js';
import { getTechnicianModel } from "../technicians/schema.js";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

export const GoogleStrategy = new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
}, async (accessToken, refreshToken, profile, done) => {
    const User = getUserModel();
    const Technician = getTechnicianModel();

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

            googleUser = await User.create({
                googleID: profile.id,
            });
        }

        googleUser.email = email;
        googleUser.name.given = profile.name.givenName;
        googleUser.name.family = profile.name.familyName;
        googleUser.googleProfileImgURL = profile._json.picture;

        let technician = await Technician.findOne({
            userID: googleUser._id,
        });
        if(technician) {
            googleUser.nowTechnician();
            technician.updateFromUser(googleUser);
            if(technician.isModified()) {
                await technician.save();
            }
        } else {
            googleUser.noLongerTechnician();
        }

        if(googleUser.isModified()) {
            await googleUser.save();
        }
        return done(null, googleUser);
    } catch(err) {
        return done(err, false);
    }
});
export const googleRules = [
    check('access_token').exists(),
];
export async function googleCallback(req, res) {
    const user = req.user;
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, {
        expiresIn: '3h',
    });
    res.status(200).json({
        token: token,
    });
}
