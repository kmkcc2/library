/* eslint-disable @typescript-eslint/no-extraneous-class */
import { type User } from '../models/user'
import db from '../models/index'

const UserModel = db.models.User

export default class UserRepository {
  static async findAll () {
    return await UserModel.findAll() as User[]
  }

  static async findUserByName (name: string) {
    return await UserModel.findOne({ where: { name } }) as User | null
  }

  static async findUserByLogin (login: string) {
    return await UserModel.findOne({ where: { login } }) as User | null
  }

  static async findUserById (id: string): Promise<User | null> {
    return await UserModel.findByPk(id) as User
  }

  static async createUser (payload: { name: string, login: string, password: string, role: string }) {
    return await UserModel.create(payload) as User
  }

  static async updateUser (id: string, payload: { name: string, login: string, password: string, role: string }) {
    return await UserModel.update(payload, {
      where: { id }
    })
  }

  static async deleteUser (id: string): Promise<number> {
    return await UserModel.destroy({ where: { id } })
  }
}
