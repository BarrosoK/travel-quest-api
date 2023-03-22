import express from "express"
import * as controller from '../controllers/auth.controller.js'
import * as validator from '../validators/auth.validator.js'
import validate from "../middlewares/validate.js"
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/', validate(validator.register), controller.register)

export default router

