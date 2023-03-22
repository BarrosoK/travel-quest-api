import express from 'express'
import routes from './routes/index.js'
import ApiError from "./utils/ApiError.js";
import httpStatus from "http-status";
import {errorConverter, errorHandler} from "./middlewares/error.js";
import * as morgan from "./config/morgan.js";
import helmet from "helmet";
import xss from 'xss-clean'
import cors from 'cors'
import passport from "passport";
import {jwtStrategy} from "./config/passport.js";

const app = express()

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(helmet())
app.use(xss())
app.use(cors())
app.options('*', cors())

app.use(express.json())

app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use('/', routes);

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Route not found'));
});

app.use(errorConverter);
app.use(errorHandler);

export default app
