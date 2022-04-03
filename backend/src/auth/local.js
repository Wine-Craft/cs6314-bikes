import jwt from 'jsonwebtoken';
import { Strategy } from 'passport-local';


import { getModel as getUserModel }  from '../users/schema.js';

const strategy = new Strategy({}, async (email, password, done) => {
    const User = getUserModel();
    try {
        const user = await User.findOne({
            email: email,
        });

        if(!user) {
            return done(null, false);
        }
        if(await user.checkPassword(password) == false) {
            return done(null, false);
        }
        return done(null, user);
    } catch(err) {
        return done(err, false);
    }
});

const callback = async function(req, res) {
    const user = req.user;
    const token = jwt.sign({
       id: user._id,
    }, process.env.JWT_SECRET);
    res.status(200).json({
        user: req.user.getSafeObject(),
        token: token,
    });
}

export const LocalStrategy = strategy;
export const localCallback = callback;