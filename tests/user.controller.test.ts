import supertest from 'supertest'
import UserRepository from '../src/repositories/user.repository'
import app from '../app'
import jwt from 'jsonwebtoken'
import { User } from '../src/models/user'
const users: User[] = []
const user: User = new User({
  id: 1,
  name: 'test',
  login: 'test',
  role: 'admin',
  password: 'pasw'
})
let accessTokenGlobal = ''

const userPayload = {
  name: 'test',
  login: 'test',
  role: 'admin',
  password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K'
}
beforeAll(() => {
  process.env.ACCESS_TOKEN_SECRET = 'test'
  const SECRET = process.env.ACCESS_TOKEN_SECRET
  const accessToken = jwt.sign(userPayload, SECRET, { expiresIn: '1h' })
  accessTokenGlobal = accessToken
})

describe('GET /users', () => {
  test('should respond with 200 status code', async () => {
    const UserRepositoryMock = jest
      .spyOn(UserRepository, 'findAll')
      .mockResolvedValueOnce(users)

    const { statusCode } = await supertest(app)
      .get('/users')
      .set('authorization', 'Bearer ' + accessTokenGlobal)
    expect(UserRepositoryMock).toHaveBeenCalled()
    expect(statusCode).toBe(200)
  })

  test('should respond with 401 status code when without access token', async () => {
    const { statusCode } = await supertest(app).get('/users')
    expect(statusCode).toBe(401)
  })
})

describe('GET /users/:id', () => {
  test('should respond with 200 status code', async () => {
    const UserRepositoryMock = jest
      .spyOn(UserRepository, 'findUserById')
      .mockResolvedValueOnce(user)

    const { statusCode } = await supertest(app)
      .get('/users/1')
      .set('authorization', 'Bearer ' + accessTokenGlobal)
    expect(UserRepositoryMock).toHaveBeenCalled()
    expect(statusCode).toBe(200)
  })

  test('should respond with 401 status code when without access token', async () => {
    const { statusCode } = await supertest(app).get('/users/1')
    expect(statusCode).toBe(401)
  })

  test('should respond with 400 status code when id invalid', async () => {
    const { statusCode } = await supertest(app)
      .get('/users/1a')
      .set('authorization', 'Bearer ' + accessTokenGlobal)
    expect(statusCode).toBe(400)
  })
})

describe('POST /users', () => {
  test('should respond with 200 status code and return new user', async () => {
    const UserRepositoryMock = jest
      .spyOn(UserRepository, 'createUser')
      .mockResolvedValueOnce(user)
    const UserFindByroleMock = jest
      .spyOn(UserRepository, 'findUserByLogin')
      .mockResolvedValue(null)
    const { statusCode, body } = await supertest(app).post('/register').send({
      name: 'test',
      login: 'test',
      role: 'role@em.com',
      password: 'password'
    })

    expect(UserFindByroleMock).toHaveBeenCalled()
    expect(UserRepositoryMock).toHaveBeenCalled()
    expect(body.name).toBe('test')
    expect(statusCode).toBe(200)
  })

  describe('DELETE /users/:id', () => {
    test('should respond with 200', async () => {
      const UserRepositoryMock = jest
        .spyOn(UserRepository, 'deleteUser')
        .mockResolvedValueOnce(1)
      const { statusCode } = await supertest(app)
        .delete('/users/1')
        .set('authorization', 'Bearer ' + accessTokenGlobal)

      expect(UserRepositoryMock).toHaveBeenCalled()
      expect(statusCode).toBe(200)
    })

    test('should respond with 404 when user not found', async () => {
      const UserRepositoryMock = jest
        .spyOn(UserRepository, 'deleteUser')
        .mockResolvedValueOnce(0)
      const { statusCode } = await supertest(app)
        .delete('/users/1')
        .set('authorization', 'Bearer ' + accessTokenGlobal)

      expect(UserRepositoryMock).toHaveBeenCalled()
      expect(statusCode).toBe(404)
    })
  })

  describe('PUT /users/:id', () => {
    test('should respond with 200', async () => {
      const UserRepositoryMock = jest
        .spyOn(UserRepository, 'updateUser')
        .mockResolvedValueOnce([1])
      const UserFindByIdMock = jest
        .spyOn(UserRepository, 'findUserById')
        .mockResolvedValueOnce(user)
      const { statusCode } = await supertest(app)
        .put('/users/1')
        .send({ name: 'update' })
        .set('authorization', 'Bearer ' + accessTokenGlobal)

      expect(UserFindByIdMock).toHaveBeenCalled()
      expect(UserRepositoryMock).toHaveBeenCalled()
      expect(statusCode).toBe(200)
    })

    test('should respond with 404 when user not found', async () => {
      const UserRepositoryMock = jest
        .spyOn(UserRepository, 'updateUser')
        .mockResolvedValueOnce([0])
      const UserFindByIdMock = jest
        .spyOn(UserRepository, 'findUserById')
        .mockResolvedValueOnce(null)
      const { statusCode } = await supertest(app)
        .put('/users/1')
        .send({ name: 'update' })
        .set('authorization', 'Bearer ' + accessTokenGlobal)

      expect(UserFindByIdMock).toHaveBeenCalled()
      expect(UserRepositoryMock).toHaveBeenCalled()
      expect(statusCode).toBe(404)
    })
  })
})
