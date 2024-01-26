import supertest from "supertest"
import { User } from "../src/models/user"
import UserRepository from "../src/repositories/user.repository"
import app from "../app"

const userPayload = new User({
  id: -1,
  name: 'test',
  login: 'test',
  password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K',
  createdAt: '2024-01-26T14:16:22.339Z' as unknown as Date,
  updatedAt: '2024-01-26T14:16:22.339Z' as unknown as Date
})
describe('POST to /login', () => {
  beforeAll(async () => {
    process.env.ACCESS_TOKEN_SECRET = 'test'
  })
  test('should respond with a 200 status code', async () => {
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByLogin').mockResolvedValueOnce(userPayload)
    const { statusCode } = await supertest(app).post('/login').send({
      login: 'test',
      password: 'qwerty123'
    })
    expect(statusCode).toBe(200)
    expect(UserRepositoryMock).toHaveBeenCalled()
  })

  test('should respond with a 404 when login invalid', async () => {
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByLogin').mockResolvedValueOnce(null)
    const { statusCode } = await supertest(app).post('/login').send({
      login: 'test',
      password: 'qwerty123'
    })
    expect(statusCode).toBe(404)
    expect(UserRepositoryMock).toHaveBeenCalled()
  })

  test('should respond with a 401 when password invalid', async () => {
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByLogin').mockResolvedValueOnce(userPayload)
    const { statusCode } = await supertest(app).post('/login').send({
      login: 'test',
      password: 'invalidPassword'
    })
    expect(statusCode).toBe(401)
    expect(UserRepositoryMock).toHaveBeenCalled()
  })
})