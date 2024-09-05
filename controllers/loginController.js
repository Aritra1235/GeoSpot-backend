import passport from 'passport';

// Handle login POST request
export const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ message: 'Login successful', user: { id: user.id, username: user.username } });
        });
    })(req, res, next);
};
