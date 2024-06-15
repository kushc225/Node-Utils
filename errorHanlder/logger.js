import { createLogger, format, transports } from 'winston';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the log file path
const logFilePath = path.join(__dirname, 'combined.log');

// Define your custom format for logging messages
const myFormat = format.printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),  // Add timestamp to logs
    myFormat  // Use your custom format
  ),
  transports: [
    new transports.Console(),  // Log to the console
    new transports.File({ filename: logFilePath })  // Log to a file
  ]
});

export default logger;
