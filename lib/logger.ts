import winston from 'winston';
import path from 'path';

// Define the log format
const logFormat = winston.format.printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}]: ${message}`;
});

// Create the logger instance
const logger = winston.createLogger({
  level: 'info', // Log only info, warn, and error levels
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    logFormat
  ),
  transports: [
    // 1. Log to a file
    // This will create a file named 'app.log' in the root of your project
    new winston.transports.File({ 
        filename: path.join(process.cwd(), 'app.log'),
        level: 'info' 
    }),
    
    // 2. Log to the console (for development)
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        logFormat
      )
    })
  ],
  exitOnError: false, // Do not exit on handled exceptions
});

export default logger;
