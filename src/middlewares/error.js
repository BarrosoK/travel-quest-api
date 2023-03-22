import ApiError from "../utils/ApiError.js";
import httpStatus from "http-status";
import logger from "../config/logger.js";

export const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, err.stack);
    }
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    const env = process.env.ENV

    if (env === 'production') {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(env === 'development' && { stack: err.stack }),
    };

    if (env === 'development') {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};
