import supertest from "supertest"
import { User } from "../src/models/user"
import UserRepository from "../src/repositories/user.repository"
import app from "../app"
import jwt from "jsonwebtoken"
import bcrypt from 'bcryptjs'

const userPayload = {
  id: 1,
  name: 'test',
  login: 'test',
  password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K',
  role: 'admin',
  createdAt: '2024-01-26T14:16:22.339Z' as unknown as Date,
  updatedAt: '2024-01-26T14:16:22.339Z' as unknown as Date
}
const user = new User(userPayload)

let accessTokenGlobal = ''
beforeAll(async () => {
  process.env.ACCESS_TOKEN_SECRET = 'test'
  const SECRET = process.env.ACCESS_TOKEN_SECRET as string
  const accessToken = jwt.sign(userPayload, SECRET, { expiresIn: '1h' })
  accessTokenGlobal = accessToken
})
describe('POST to /login', () => {

  test('should respond with a 200 status code', async () => {
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByLogin').mockResolvedValueOnce(user)
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
    const UserRepositoryMock = jest.spyOn(UserRepository, 'findUserByLogin').mockResolvedValueOnce(user)
    const { statusCode } = await supertest(app).post('/login').send({
      login: 'test',
      password: 'invalidPassword'
    })
    expect(statusCode).toBe(401)
    expect(UserRepositoryMock).toHaveBeenCalled()
  })
})
describe('POST to /register', () => {
  test('should respond with 400 when user payload is incorrect', async () => {
    const UserFindByLoginMock = jest
      .spyOn(UserRepository, 'findUserByLogin')
      .mockResolvedValue(user)
    const { statusCode } = await supertest(app)
      .post('/register')
      .send({ login: 'asd', password: 'pass'})

    expect(UserFindByLoginMock).toHaveBeenCalled()
    expect(statusCode).toBe(400)
  })
  test('should respond with 200 status code and return new user', async () => {
    const UserRepositoryMock = jest
      .spyOn(UserRepository, 'createUser')
      .mockResolvedValueOnce(user)
    const UserFindByLoginMock = jest
      .spyOn(UserRepository, 'findUserByLogin')
      .mockResolvedValue(null)
    const { statusCode, body } = await supertest(app).post('/register').send({
      name: 'test',
      login: 'test',
      role: 'admin',
      password: 'password'
    })
    expect(UserFindByLoginMock).toHaveBeenCalled()
    expect(UserRepositoryMock).toHaveBeenCalled()
    expect(body.role).toBe('admin')
    expect(statusCode).toBe(200)
  })
})