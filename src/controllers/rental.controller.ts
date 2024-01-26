import { type Request, type Response } from 'express'
import { Book } from '../models/book'
import RentalRepository from '../repositories/rental.repository'
import { JwtPayload, decode } from 'jsonwebtoken'

export const rentBook = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization
  if (authHeader) {
    const token = authHeader.split(' ')[1]
    const decoded = decode(token) as JwtPayload
    const user_id = decoded.id
    try {
      const book_id = req.params.book_id
      if (book_id === null) throw new Error('Book Id must be specified')
      const book = Book.findByPk(book_id)
      if (book === null) {
        return res.status(404).send({
          message: `Cannot find book with id: ${book_id}`
        })
      }
      const isRented = await RentalRepository.findRentalByBookId(book_id)
      if (isRented !== null) {
        return res.status(422).send({
          message: `Book with id: ${book_id} is already rented`
        })
      }
      res.send( await RentalRepository.createRental({user_id, book_id}))
    } catch (err) {
      if (err instanceof Error) console.log(err.message)
      return res.status(500).send({
        message: 'Internal Server Error'
      })
    }
  }

}
export const returnBook = (req: Request, res: Response) => {

}