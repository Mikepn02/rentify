import winston from "winston"


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'rental-service'},
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});


if (process.env.ENVIRONMENT === "development"){
    logger.add(new winston.transports.Console({
        format: winston.format.json()
    }))
}

export default logger;