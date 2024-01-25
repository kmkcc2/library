import express from 'express'
import { authorizeAdmin, authorizeUser } from '../middleware/authorize'
import { create, destroy, findAll, findOne, update } from '../controllers/book.controller'

const router = express.Router()

router.route('/')
  .post(authorizeAdmin, create)
  .get(authorizeUser, findAll)

router.route('/:id')
  .get(authorizeUser, findOne)
  .put(authorizeAdmin, update)
  .delete(authorizeAdmin, destroy)


export default router
