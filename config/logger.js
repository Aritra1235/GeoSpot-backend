import { createLogger, format, transports } from 'winston';

// Define custom logging format
const logFormat = format.combine(
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.printf(({ timestamp, level, message }) => `${timestamp} ${level}: ${message}`)
);

// Create the logger instance
const logger = createLogger({
    level: 'info', // Log level
    format: logFormat,
    transports: [
        new transports.Console(), // Log to the console
        new transports.File({ filename: 'logs/combined.log' }) // Log to a file
    ]
});

export default logger;
