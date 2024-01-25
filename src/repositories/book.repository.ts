
import { QueryTypes } from 'sequelize'
import { type Book } from '../models/book'
import sequelize from '../models/index'
import db from '../models/index'

const BookModel = db.models.Book

export default class BookRepository {
  static async findAll() {
    return await BookModel.findAll() as Book[]
  }

  static async findAllAvailable() {
    return await sequelize.query("SELECT * FROM `Books`", { type: QueryTypes.SELECT }) as unknown as Book[]
  }

  static async findBookByName(name: string) {
    return await BookModel.findOne({ where: { name } }) as Book | null
  }

  static async findBookByIsbn(isbn: string) {
    return await BookModel.findOne({ where: { isbn } }) as Book | null
  }

  static async findBookByAuthor(author: string) {
    return await BookModel.findOne({ where: { author } }) as Book | null
  }

  static async findBookById(id: string): Promise<Book | null> {
    return await BookModel.findByPk(id) as Book
  }

  static async createBook(payload: { name: string, isbn: string, author: string }) {
    return await BookModel.create(payload) as Book
  }

  static async updateBook(id: string, payload: { name: string, isbn: string, author: string }) {
    return await BookModel.update(payload, {
      where: { id }
    })
  }

  static async deleteBook(id: string): Promise<number> {
    return await BookModel.destroy({ where: { id } })
  }
}
