import jwt from 'jsonwebtoken';
import { check } from "express-validator";
import { Strategy } from 'passport-local';

import { getUserModel }  from '../users/schema.js';

export const localRules = [
    check('username').isEmail(),
    check('password').isLength({
        min: 1,
    }),
];
export const LocalStrategy = new Strategy({}, async (email, password, done) => {
    const User = getUserModel();
    try {
        const user = await User.findOne({
            email: email,
            googleID: null,
        });

        if(!user) {
            return done(null, false);
        }
        if(await user.checkPassword(password) === false) {
            return done(null, false);
        }
        return done(null, user);
    } catch(err) {
        return done(err, false);
    }
});
export async function localCallback(req, res) {
    const user = req.user;
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, {
        expiresIn: '3h',
    });
    res.status(200).json({
        token: token,
    });
};