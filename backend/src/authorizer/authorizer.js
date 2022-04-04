import passport from 'passport';

export const isLoggedIn = passport.authenticate('jwt', {
    session: false,
});

export function isAdmin(req, res, next) {
    if(req.user.isAdmin) {
        return next();
    }
    return res.status(401).send();
}