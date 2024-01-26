import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import UserRepository from '../repositories/user.repository'
import jwt from 'jsonwebtoken'

const SALT_ROUNDS = 10
export const register = async (req: Request, res: Response) => {
  const password = req.body.password
  const hash = bcrypt.hashSync(password, SALT_ROUNDS)
  const user = {
    name: req.body.name,
    login: req.body.login,
    password: hash,
    role: 'user'
  }
  try {
    const userUnique = await UserRepository.findUserByLogin(
      user.login
    )
    if (userUnique) {
      return res.status(422).send({
        message: 'Login has already been taken.'
      })
    }
    const newUser = await UserRepository.createUser(user)
    return res.send(newUser)
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    return res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}
export const login = async (req: Request, res: Response) => {
  const user = await UserRepository.findUserByLogin(req.body.login)
  if (!user) {
    return res
      .status(404)
      .send({ message: 'User with provided login does not exist.' })
  }
  const payload: { id: number, name: string, login: string, role: string } = {
    id: user.id,
    name: user.name,
    login: user.login,
    role: user.role
  }
  if (bcrypt.compareSync(req.body.password, user.password)) {
    const SECRET = process.env.ACCESS_TOKEN_SECRET as string
    const accessToken = jwt.sign(payload, SECRET, { expiresIn: '1h' })
    return res.send(
      {
        token: accessToken
      })
  }
  return res.status(401).send({ message: 'Password is invalid' })
}