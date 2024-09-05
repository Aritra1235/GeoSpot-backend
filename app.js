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

// Error-Handling Middleware for Express
app.use((err, req, res, next) => {
    logger.error(`Error in ${req.method} ${req.url} from IP: ${req.ip} - ${err.message}`);
    logger.error(err.stack); // Logs stack trace for debugging

    res.status(500).json({ message: 'Something went wrong!' });
});

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
    logger.error(`Uncaught Exception: ${error.message}`);
    logger.error(error.stack);
    process.exit(1); // Exit the app after logging
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Rejection: ${reason}`);
    logger.error(promise);
});




// Sync database and start the server
import sequelize from './config/database.js';

sequelize.sync().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`);
    });
});
