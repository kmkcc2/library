"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.update = exports.findOne = exports.findAll = exports.create = void 0;
const sequelize_1 = require("sequelize");
const book_repository_1 = __importDefault(require("../repositories/book.repository"));
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = {
        name: req.body.name,
        author: req.body.author,
        isbn: req.body.isbn
    };
    try {
        const newBook = yield book_repository_1.default.createBook(book);
        return res.send(newBook);
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});
exports.create = create;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const availableOnly = req.query.filter === 'available';
        if (availableOnly) {
            res.send(yield book_repository_1.default.findAllAvailable());
            console.log('available');
        }
        else {
            res.send(yield book_repository_1.default.findAll());
        }
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        res.status(500).send({
            message: 'Internal Server Error.'
        });
    }
});
exports.findAll = findAll;
const findOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === null)
            throw new Error('Id must be specified');
        const book = yield book_repository_1.default.findBookById(id);
        if (book !== null)
            return res.send(book);
        return res.status(404).send({
            message: `Cannot find book with id: ${id}`
        });
    }
    catch (err) {
        console.log(err);
        if (err instanceof sequelize_1.DatabaseError) {
            return res.status(400).send({
                message: 'Bad request.'
            });
        }
        return res.status(500).send({
            message: 'Internal Server Error.'
        });
    }
});
exports.findOne = findOne;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    if (id === null)
        throw new Error('Id must be specified');
    const oldBook = yield book_repository_1.default.findBookById(id);
    if (oldBook === null) {
        return res.status(404).send({
            message: 'Book not found.'
        });
    }
    if (Object.keys(req.body).length === 0) {
        return res.status(404).send({
            message: `Cannot update Book with id=${id}, req.body is empty!`
        });
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
    };
    const response = yield book_repository_1.default.updateBook(id, bookBody);
    if (response !== null) {
        return res.send({
            message: 'Book was updated successfully.'
        });
    }
    throw new Error();
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === null)
            throw new Error('Id must be specified');
        const response = yield book_repository_1.default.deleteBook(id);
        if (response === 1) {
            return res.send({
                message: 'Book was deleted successfully!'
            });
        }
        return res.status(404).send({
            message: `Book with id: ${id} not found.`
        });
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        if (err instanceof sequelize_1.DatabaseError) {
            return res.status(400).send({
                message: 'Bad request.'
            });
        }
        return res.status(500).send({
            message: 'Internal Server Error.'
        });
    }
});
exports.destroy = destroy;
