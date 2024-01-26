import express from 'express'
import { login, register } from '../controllers/auth.controller'
import { validateRequest } from '../middleware/request.validator'
import loginSchema from '../middleware/validators/login.schema'
import registerSchema from '../middleware/validators/register.schema'
const router = express.Router()

router.route('/register')
  .post(validateRequest(registerSchema), register)

router.route('/login')
  .post(validateRequest(loginSchema), login)

export default router
