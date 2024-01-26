import supertest from "supertest"
import BookRepository from "../src/repositories/book.repository"
import app from "../app"
import { Book } from "../src/models/book"
import { User } from "../src/models/user"
import jwt from 'jsonwebtoken'

const bookPayload = new Book({
  id: -1,
  title: 'test',
  author: 'test',
  isbn: 'test',
  createdAt: '2024-01-26T14:16:22.339Z' as unknown as Date,
  updatedAt: '2024-01-26T14:16:22.339Z' as unknown as Date
})
let accessTokenGlobal: string
const userPayload = {
  id: -1,
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
describe('GET to /books/?filter=available', () => {
  test('should respond with 200 status code', async () => {
    const BookRepositoryMock = jest
      .spyOn(BookRepository, 'findAllAvailable')
      .mockResolvedValueOnce([bookPayload] as Book[])

    const { statusCode } = await supertest(app)
      .get('/books/?filter=available')
      .set('authorization', 'Bearer ' + accessTokenGlobal)
    expect(BookRepositoryMock).toHaveBeenCalled()
    expect(statusCode).toBe(200)
  })
})

describe('DELETE to /books/:id', () => {
  test('should respond with 401 status code when executed by regular user', async () => {
    const BookRepositoryMock = jest
      .spyOn(BookRepository, 'findBookById')
      .mockResolvedValueOnce(bookPayload as Book)

    const { statusCode } = await supertest(app)
      .delete('/books/1')
      .set('authorization', 'Bearer ' + accessTokenGlobal)
    expect(statusCode).toBe(401)
  })
})