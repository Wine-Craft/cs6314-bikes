import express from 'express';
import passport from 'passport';

import getMe from './me.js';
import { JWTStrategy } from "./jwt.js";
import { LocalStrategy, localCallback } from "./local.js";
import { GoogleStrategy, googleCallback } from "./google.js";


passport.use('jwt', JWTStrategy);
passport.use('local', LocalStrategy);
passport.use('google', GoogleStrategy);
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    console.log('OBJ', obj);
    done(null, obj);
});

const router = express.Router();
router.post('/local/login', passport.authenticate('local', {
    session: false,
    failureMessage: true,
}), localCallback);
router.post('/google/login', passport.authenticate('google', {
    session: false,
    failureMessage: true,
}), googleCallback);
router.get('/me', passport.authenticate('jwt'), getMe);

export const authRouter = router;