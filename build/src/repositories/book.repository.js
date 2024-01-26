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
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("../models/index"));
const index_2 = __importDefault(require("../models/index"));
const BookModel = index_2.default.models.Book;
class BookRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel.findAll();
        });
    }
    static findAllAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield index_1.default.query("SELECT * FROM \"Books\" LEFT JOIN \"Rentals\" ON \"Books\".id=\"Rentals\".book_id;", { type: sequelize_1.QueryTypes.SELECT });
        });
    }
    static findBookByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel.findOne({ where: { name } });
        });
    }
    static findBookByIsbn(isbn) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel.findOne({ where: { isbn } });
        });
    }
    static findBookByAuthor(author) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel.findOne({ where: { author } });
        });
    }
    static findBookById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel.findByPk(id);
        });
    }
    static createBook(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel.create(payload);
        });
    }
    static updateBook(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel.update(payload, {
                where: { id }
            });
        });
    }
    static deleteBook(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield BookModel.destroy({ where: { id } });
        });
    }
}
exports.default = BookRepository;
