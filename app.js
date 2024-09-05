import express from 'express';
import session from 'express-session';
import passport from 'passport';
import dotenv from 'dotenv';
import logger from './config/logger.js'; // Import the logger

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
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Parse JSON requests
app.use(express.json());

// Request Logging Middleware
app.use((req, res, next) => {
    const { method, url, ip } = req;
    logger.info(`Request: ${method} ${url} from IP: ${ip}`);
    next();
});

// Routes
app.use('/api/login', loginRoutes);
app.use('/api/signup', signupRoutes);

// Sync database and start the server
import sequelize from './config/database.js';

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
});
