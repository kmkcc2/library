
import { QueryTypes } from 'sequelize'
import { type Rental } from '../models/rental'
import sequelize from '../models/index'
import db from '../models/index'

const RentalModel = db.models.Rental

export default class RentalRepository {
  static async findAll() {
    return await RentalModel.findAll() as Rental[]
  }

  static async findRentalByBookId(book_id: string) {
    return await RentalModel.findOne({ where: { book_id } }) as Rental | null
  }

  static async findRentalByUserId(user_id: string) {
    return await RentalModel.findOne({ where: { user_id } }) as Rental | null
  }

  static async findRentalById(id: string): Promise<Rental | null> {
    return await RentalModel.findByPk(id) as Rental
  }

  static async createRental(payload: { user_id: string, book_id: string }) {
    return await RentalModel.create(payload) as Rental
  }

  static async deleteRental(id: string): Promise<number> {
    return await RentalModel.destroy({ where: { id } })
  }
}
