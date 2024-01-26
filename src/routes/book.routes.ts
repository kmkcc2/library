import express from 'express'
import { authorizeAdminOnly, authorizeAdminOrUser, authorizeUserOnly } from '../middleware/authorize'
import { create, destroy, findAll, findOne, update } from '../controllers/book.controller'
import { rentBook, returnBook } from '../controllers/rental.controller'
const router = express.Router()

router.route('/')
  .post(authorizeAdminOnly, create)
  .get(authorizeAdminOrUser, findAll)

router.route('/:id')
  .get(authorizeAdminOrUser, findOne)
  .put(authorizeAdminOnly, update)
  .delete(authorizeAdminOnly, destroy)

router.route('/:id/rent')
  .post(authorizeUserOnly, rentBook)

router.route('/:id/return')
  .post(authorizeUserOnly, returnBook)

export default router
