import { createLogger, format, transports } from 'winston';
import path from 'path';

// Define custom logging format
const logFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(({ timestamp, level, message, stack }) => 
        `${timestamp} ${level}: ${stack || message}`) // log error stack trace if available
);

// Create the logger instance
const logger = createLogger({
    level: 'info', // Log info, error, etc.
    format: logFormat,
    transports: [
        new transports.Console(), // Log to console
        new transports.File({ filename: 'logs/combined.log' }), // General logs
        new transports.File({ 
            filename: 'logs/errors.log', 
            level: 'error' // Only log errors to this file
        })
    ]
});

export default logger;
