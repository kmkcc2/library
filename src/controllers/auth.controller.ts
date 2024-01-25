import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import UserRepository from '../repositories/user.repository'

export const register = async (req: Request, res: Response) => {
  const hash = bcrypt.hashSync(req.body.password, 10)
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
export const login = (req: Request, res: Response) => {}