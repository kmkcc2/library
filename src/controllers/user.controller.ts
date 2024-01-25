import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import UserRepository from '../repositories/user.repository'
import { DatabaseError, ValidationError } from 'sequelize'

const SALT_ROUNDS = 10
export const create = async (
  req: Request,
  res: Response
) => {
  const hash = bcrypt.hashSync(req.body.password, SALT_ROUNDS)
  const user = {
    name: req.body.name,
    login: req.body.login,
    password: hash,
    role: req.body.role
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

export const findAll = async (req: Request, res: Response) => {
  try {
    res.send(await UserRepository.findAll())
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    res.status(500).send({
      message: 'Internal Server Error.'
    })
  }
}

export const findOne = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id === null) throw new Error('Id must be specified')
    const user = await UserRepository.findUserById(id)
    if (user !== null) return res.send(user)
    return res.status(404).send({
      message: `Cannot find user with id: ${id}`
    })
  } catch (err) {
    console.log(err)
    if (err instanceof DatabaseError) {
      return res.status(400).send({
        message: 'Bad request.'
      })
    }
    return res.status(500).send({
      message: 'Internal Server Error.'
    })
  }
}

export const update = async (
  req: Request,
  res: Response
) => {
  try {
    const id = req.params.id
    if (id === null) throw new Error('Id must be specified')
    const oldUser = await UserRepository.findUserById(id)
    if (oldUser === null) {
      return res.status(404).send({
        message: 'User not found.'
      })
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(404).send({
        message: `Cannot update User with id=${id}, req.body is empty!`
      })
    }
    if (Object.prototype.hasOwnProperty.call(
      req.body,
      'role'
    )) {
      return res.status(403).send({
        message: `Permisson denied, role cannot be changed.`
      })
    }
    const newPassword = Object.prototype.hasOwnProperty.call(
      req.body,
      'password'
    )
      ? bcrypt.hashSync(req.body.password, SALT_ROUNDS)
      : oldUser.password
    const userBody = {
      name: Object.prototype.hasOwnProperty.call(req.body, 'name')
        ? req.body.name
        : oldUser.name,
      login: Object.prototype.hasOwnProperty.call(req.body, 'login')
        ? req.body.login
        : oldUser.login,
      role: oldUser.role,
      password: newPassword
    }
    const response = await UserRepository.updateUser(id, userBody)
    if (response !== null) {
      return res.send({
        message: 'User was updated successfully.'
      })
    }
    throw new Error()
  } catch (err) {
    console.log(err)
    if (err instanceof ValidationError) {
      return res.status(422).send({
        message: err.errors[0].message
      })
    }
    return res.status(500).send({
      message: 'Internal Server Error.'
    })
  }
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id === null) throw new Error('Id must be specified')
    const response = await UserRepository.deleteUser(id)
    if (response === 1) {
      return res.send({
        message: 'User was deleted successfully!'
      })
    }
    return res.status(404).send({
      message: `User with id: ${id} not found.`
    })
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    if (err instanceof DatabaseError) {
      return res.status(400).send({
        message: 'Bad request.'
      })
    }
    return res.status(500).send({
      message: 'Internal Server Error.'
    })
  }
}