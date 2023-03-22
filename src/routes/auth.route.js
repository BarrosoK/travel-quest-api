import express from "express"
import * as controller from '../controllers/auth.controller.js'
import * as validator from '../validators/auth.validator.js'
import validate from "../middlewares/validate.js"
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', validate(validator.register), controller.register)
router.post('/login', validate(validator.login), controller.login)
router.post('/logout', validate(validator.logout), controller.logout)
router.post('/refresh-tokens', validate(validator.refreshTokens), controller.refreshTokens);
router.post('/forgot-password', validate(validator.forgotPassword), controller.forgotPassword);
router.post('/reset-password', validate(validator.resetPassword), controller.resetPassword);
router.post('/send-verification-email', auth(), controller.sendVerificationEmail);
router.post('/verify-email', validate(validator.verifyEmail), controller.verifyEmail);

export default router

