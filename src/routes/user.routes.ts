import express from 'express'
import { create, destroy, findAll, findOne, update } from '../controllers/user.controller'
const router = express.Router()

router.route('/')
  .post(create)
  .get(findAll)

router.route('/:id')
  .get(findOne)
  .put(update)
  .delete(destroy)

export default router
