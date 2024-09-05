import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';

export default function(passport) {
    passport.use(new LocalStrategy({ usernameField: 'username' }, async (username, password, done) => {
        try {
            // Find user in the database
            const user = await User.findOne({ where: { username } });

            if (!user) {
                return done(null, false, { message: 'No user with that username' });
            }

            // Compare password with hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return done(null, false, { message: 'Password incorrect' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }));

    // Serialize user to store in session
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // Deserialize user from session
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}
