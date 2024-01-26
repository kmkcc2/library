import express from 'express'
import { authorizeAdminOnly, authorizeAdminOrUser } from '../middleware/authorize'
import { create, destroy, findAll, findOne, update } from '../controllers/book.controller'

const router = express.Router()

router.route('/')
  .post(authorizeAdminOnly, create)
  .get(authorizeAdminOrUser, findAll)

router.route('/:id')
  .get(authorizeAdminOrUser, findOne)
  .put(authorizeAdminOnly, update)
  .delete(authorizeAdminOnly, destroy)


export default router
