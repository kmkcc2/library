import express from 'express'
import { create, destroy, findAll, findOne, update } from '../controllers/user.controller'
import { authorizeAdmin, authorizeUser } from '../middleware/authorize'
const router = express.Router()

router.route('/')
  .post(authorizeAdmin, create)
  .get(authorizeAdmin, findAll)

router.route('/:id')
  .get(authorizeAdmin, findOne)
  .put(authorizeUser, update)
  .delete(authorizeUser, destroy)

export default router
