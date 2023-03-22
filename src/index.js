import dotenv from 'dotenv'
dotenv.config()
import app from './app.js'
import logger from "./config/logger.js"
import mongoose from 'mongoose'

let server = undefined

mongoose.connect(process.env.MONGO_URL).then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(process.env.PORT, () => {
        logger.info(`Listening to port ${process.env.PORT}`)
    })
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed.');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
