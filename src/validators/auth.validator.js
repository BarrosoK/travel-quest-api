import Joi from 'joi'
import {password} from "./helper.validator.js";

export const register = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        location: Joi.string().optional(),
    }),
}

export const login = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
    }),
}

export const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
}

export const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
}

export const forgotPassword = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
    }),
}

export const resetPassword = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
    body: Joi.object().keys({
        password: Joi.string().required().custom(password),
    }),
}

export const verifyEmail = {
    query: Joi.object().keys({
        token: Joi.string().required(),
    }),
}
