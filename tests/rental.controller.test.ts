import supertest from "supertest"
import BookRepository from "../src/repositories/book.repository"
import app from "../app"
import { Book } from "../src/models/book"
import { User } from "../src/models/user"
import jwt from 'jsonwebtoken'
import RentalRepository from "../src/repositories/rental.repository"
import { Rental } from "../src/models/rental"

const bookPayload = new Book({
  id: 1,
  title: 'test',
  author: 'test',
  isbn: 'test',
  createdAt: '2024-01-26T14:16:22.339Z' as unknown as Date,
  updatedAt: '2024-01-26T14:16:22.339Z' as unknown as Date
})
const rentalPayload = new Rental({
  id: 1,
  user_id: 1,
  book_id: 1,
  createdAt: '2024-01-26T14:16:22.339Z' as unknown as Date,
  updatedAt: '2024-01-26T14:16:22.339Z' as unknown as Date
})
let accessTokenGlobal: string
const userPayload = {
  id: 1,
  name: 'test',
  login: 'test',
  password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K',
  role: 'user',
  createdAt: '2024-01-26T14:16:22.339Z' as unknown as Date,
  updatedAt: '2024-01-26T14:16:22.339Z' as unknown as Date
}
beforeAll(() => {
  process.env.ACCESS_TOKEN_SECRET = 'test'
  const SECRET = process.env.ACCESS_TOKEN_SECRET
  const accessToken = jwt.sign(userPayload, SECRET, { expiresIn: '1h' })
  accessTokenGlobal = accessToken
})
describe('GET to /books/:id/rent/', () => {
  test('should respond with 422 status code when book already rented', async () => {
    const RentalRepositoryMock = jest.spyOn(RentalRepository, 'findRentalByBookId')
      .mockResolvedValueOnce(rentalPayload)

    const BookRepositoryMock = jest
      .spyOn(BookRepository, 'findBookById')
      .mockResolvedValueOnce(bookPayload)

    const { statusCode } = await supertest(app)
      .post('/books/1/rent/')
      .set('authorization', 'Bearer ' + accessTokenGlobal)
    expect(RentalRepositoryMock).toHaveBeenCalled
    expect(BookRepositoryMock).toHaveBeenCalled
    expect(statusCode).toBe(422)
  })
})

describe('GET to /books/:id/return', () => {
  test('should respond with 200 status code book returned', async () => {
    const RentalRepositoryFindMock = jest
      .spyOn(RentalRepository, 'findRentalByBookId')
      .mockResolvedValueOnce(rentalPayload)
    const RentalRepositoryDeleteMock = jest
      .spyOn(RentalRepository, 'deleteRental')
      .mockResolvedValueOnce(1)
    const BookRepositoryMock = jest
      .spyOn(BookRepository, 'findBookById')
      .mockResolvedValueOnce(bookPayload)
    const { statusCode } = await supertest(app)
      .post('/books/1/return')
      .set('authorization', 'Bearer ' + accessTokenGlobal)
    expect(RentalRepositoryFindMock).toHaveBeenCalled
    expect(RentalRepositoryDeleteMock).toHaveBeenCalled
    expect(BookRepositoryMock).toHaveBeenCalled
    expect(statusCode).toBe(200)
  })
})