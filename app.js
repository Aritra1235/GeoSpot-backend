import express from 'express';
import session from 'express-session';
import passport from 'passport';
import sequelize from './config/database.js';
import dotenv from 'dotenv';

import loginRoutes from './routes/login.js';
import signupRoutes from './routes/signup.js';
import passportConfig from './config/passportConfig.js';

dotenv.config();

// Initialize Express app
const app = express();

// Passport configuration
passportConfig(passport);

// Express session middleware
app.use(session({
    secret: 'ggwp',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Parse JSON requests
app.use(express.json());

// Routes
app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);

// Sync database and start the server
sequelize.sync().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
