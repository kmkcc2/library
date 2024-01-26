import express from 'express'
import { authorizeAdminOnly, authorizeAdminOrUser, authorizeUserOnly } from '../middleware/authorize'
import { create, destroy, findAll, findOne, update } from '../controllers/book.controller'
import { rentBook, returnBook } from '../controllers/rental.controller'
import { validateRequest } from '../middleware/request.validator'
import { createValidation, putValidation } from '../middleware/validators/book.schema'
const router = express.Router()

router.route('/')
  .post(authorizeAdminOnly, validateRequest(createValidation), create)
  .get(authorizeAdminOrUser, findAll)

router.route('/:id')
  .get(authorizeAdminOrUser, findOne)
  .put(authorizeAdminOnly, validateRequest(putValidation), update)
  .delete(authorizeAdminOnly, destroy)

router.route('/:id/rent')
  .post(authorizeUserOnly, rentBook)

router.route('/:id/return')
  .post(authorizeUserOnly, returnBook)

export default router
