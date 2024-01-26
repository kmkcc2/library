import express from 'express'
import { authorize } from '../middleware/authorize'
import { Role } from '../common/accountRoles'
import { create, destroy, findAll, findOne, update } from '../controllers/book.controller'
import { rentBook, returnBook } from '../controllers/rental.controller'
import { validateRequest } from '../middleware/request.validator'
import { createValidation, putValidation } from '../middleware/validators/book.schema'
const router = express.Router()

router.route('/')
  .post(authorize(Role.Admin), validateRequest(createValidation), create)
  .get(authorize(), findAll)

router.route('/:id')
  .get(authorize(), findOne)
  .put(authorize(Role.Admin), validateRequest(putValidation), update)
  .delete(authorize(Role.Admin), destroy)

router.route('/:id/rent')
  .post(authorize(Role.User), rentBook)

router.route('/:id/return')
  .post(authorize(Role.User), returnBook)

export default router
