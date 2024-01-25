import express from 'express'
const router = express.Router()

router.route('/books')
  .get(findAll)
router.route('/books/rent')
  .post(rent)
router.route('/books/return')
  .post(return)

export default router
