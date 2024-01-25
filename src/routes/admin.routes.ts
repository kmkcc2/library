import express from 'express'
const router = express.Router()

router.route('/register')
  .get(register)
router.route('/books')
  .post(create)
  .put(update)

router.route('/books/:id')
  .delete(destroy)

export default router
