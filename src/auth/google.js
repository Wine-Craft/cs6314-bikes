import { Strategy } from 'passport-google-oauth2';

import Users from '../users/schema';

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const domain = process.env.DOMAIN;
const port = process.env.PORT;

const strategy = new Strategy({
    clientID: clientID,
    clientSecret: clientSecret,
    callbackURL: `http://${domain}:${port}/auth/google/callback`,
    passReqToCallback: true,
}, (request, accessToken, refreshToken, profile, done) => {
    const user = Users.findOrCreate({
        googleID: profile.id,
    });
    user.username = profile.displayName;
});

module.exports = strategy;