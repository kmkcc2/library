import express from 'express'
import { create, destroy, findAll, findOne, update } from '../controllers/user.controller'
import { authorizeAdminOnly, authorizeAdminOrUser } from '../middleware/authorize'
const router = express.Router()

router.route('/')
  .post(authorizeAdminOnly, create)
  .get(authorizeAdminOnly, findAll)

router.route('/:id')
  .get(authorizeAdminOnly, findOne)
  .put(authorizeAdminOrUser, update)
  .delete(authorizeAdminOrUser, destroy)

export default router
