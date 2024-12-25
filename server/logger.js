const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// custom log format
const myformat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
})


// Create the logger
const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        myformat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'development.log' })
    ]
})

module.exports = logger;