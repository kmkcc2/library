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
exports.returnBook = exports.rentBook = void 0;
const rental_repository_1 = __importDefault(require("../repositories/rental.repository"));
const jsonwebtoken_1 = require("jsonwebtoken");
const book_repository_1 = __importDefault(require("../repositories/book.repository"));
const rentBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decoded = (0, jsonwebtoken_1.decode)(token);
        const user_id = decoded.id;
        try {
            const book_id = req.params.id;
            if (book_id === null)
                throw new Error('Book Id must be specified');
            const book = yield book_repository_1.default.findBookById(book_id);
            if (book === null) {
                return res.status(404).send({
                    message: `Cannot find book with id: ${book_id}`
                });
            }
            const isRented = yield rental_repository_1.default.findRentalByBookId(book_id);
            if (isRented !== null) {
                return res.status(422).send({
                    message: `Book with id: ${book_id} is already rented`
                });
            }
            res.send(yield rental_repository_1.default.createRental({ user_id, book_id }));
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        }
    }
});
exports.rentBook = rentBook;
const returnBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decoded = (0, jsonwebtoken_1.decode)(token);
        const user_id = decoded.id;
        try {
            const book_id = req.params.id;
            if (book_id === null)
                throw new Error('Book Id must be specified');
            const book = yield book_repository_1.default.findBookById(book_id);
            if (book === null) {
                return res.status(404).send({
                    message: `Cannot find book with id: ${book_id}`
                });
            }
            const isRented = yield rental_repository_1.default.findRentalByBookId(book_id);
            if (isRented === null) {
                return res.status(422).send({
                    message: `Book with id: ${book_id} has not been rented`
                });
            }
            if (isRented.user_id !== user_id) {
                return res.status(422).send({
                    message: `Book with id: ${book_id} is rented by different user. You have not rented this book.`
                });
            }
            const response = yield rental_repository_1.default.deleteRental(isRented.id);
            if (response === 1) {
                return res.send({
                    message: 'Book has been returned successfully!'
                });
            }
        }
        catch (err) {
            if (err instanceof Error)
                console.log(err.message);
            return res.status(500).send({
                message: 'Internal Server Error'
            });
        }
    }
});
exports.returnBook = returnBook;
