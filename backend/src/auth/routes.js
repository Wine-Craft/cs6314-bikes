import express from 'express';
import passport from 'passport';

import getMe from './me.js';
import { JWTStrategy } from "./jwt.js";
import validate from "../validator/validate.js";
import { isLoggedIn } from "../authorizer/authorizer.js";
import { LocalStrategy, localCallback, localRules } from "./local.js";
import { GoogleStrategy, googleCallback, googleRules } from "./google.js";

passport.use('jwt', JWTStrategy);
passport.use('local', LocalStrategy);
passport.use('google', GoogleStrategy);
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

const router = express.Router();
router.post('/local/login', localRules, validate,
    passport.authenticate('local', { session: false }),
    localCallback,
);
router.post('/google/login', googleRules, validate,
    passport.authenticate('google', { session: false }),
    googleCallback,
);
router.get('/me', isLoggedIn, getMe);

export const authRouter = router;