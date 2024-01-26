import express from 'express'
import { create, destroy, findAll, findOne, update } from '../controllers/user.controller'
import { authorize } from '../middleware/authorize'
import { Role } from '../common/accountRoles'

const router = express.Router()

router.route('/')
  .post(authorize(Role.Admin), create)
  .get(authorize(Role.Admin), findAll)

router.route('/:id')
  .get(authorize(Role.Admin), findOne)
  .put(authorize(Role.Admin), update)
  .delete(authorize(Role.Admin), destroy)

export default router
