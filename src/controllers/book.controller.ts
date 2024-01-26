import { type Request, type Response } from 'express'
import { Book } from '../models/book'
import { DatabaseError } from 'sequelize'
import BookRepository from '../repositories/book.repository'

export const create = async (req: Request, res: Response) => {
  const book = {
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn
  }
  try {
    const newBook = await Book.create(book)
    return res.send(newBook)
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    return res.status(500).send({
      message: 'Internal Server Error'
    })
  }
}

export const findAll = async (req: Request, res: Response) => {
  try {
    const availableOnly = req.query.filter === 'available'
    console.log(req.query)
    if (availableOnly) {
      res.send(await BookRepository.findAllAvailable())
      console.log('available')
    }else{
      res.send(await Book.findAll())
      console.log('all')

    }
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
    const book = await Book.findByPk(id)
    if (book !== null) return res.send(book)
    return res.status(404).send({
      message: `Cannot find book with id: ${id}`
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

export const update = async (req: Request, res: Response) => {
  const id = req.params.id
  if (id === null) throw new Error('Id must be specified')
  const oldBook = await BookRepository.findBookById(id)
  if (oldBook === null) {
    return res.status(404).send({
      message: 'Book not found.'
    })
  }
  if (Object.keys(req.body).length === 0) {
    return res.status(404).send({
      message: `Cannot update Book with id=${id}, req.body is empty!`
    })
  }
  const bookBody = {
    name: Object.prototype.hasOwnProperty.call(req.body, 'name')
      ? req.body.name
      : oldBook.name,
    author: Object.prototype.hasOwnProperty.call(req.body, 'author')
      ? req.body.author
      : oldBook.author,
    isbn: Object.prototype.hasOwnProperty.call(req.body, 'isbn')
    ? req.body.isbn
    : oldBook.isbn,
  }
  const response = await BookRepository.updateBook(id, bookBody)
  if (response !== null) {
    return res.send({
      message: 'Book was updated successfully.'
    })
  }
  throw new Error()
}

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    if (id === null) throw new Error('Id must be specified')
    const response = await Book.destroy({ where: { id } })
    if (response === 1) {
      return res.send({
        message: 'Book was deleted successfully!'
      })
    }
    return res.status(404).send({
      message: `Book with id: ${id} not found.`
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
