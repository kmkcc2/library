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
const supertest_1 = __importDefault(require("supertest"));
const book_repository_1 = __importDefault(require("../src/repositories/book.repository"));
const app_1 = __importDefault(require("../app"));
const book_1 = require("../src/models/book");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const rental_repository_1 = __importDefault(require("../src/repositories/rental.repository"));
const rental_1 = require("../src/models/rental");
const bookPayload = new book_1.Book({
    id: 1,
    title: 'test',
    author: 'test',
    isbn: 'test',
    createdAt: '2024-01-26T14:16:22.339Z',
    updatedAt: '2024-01-26T14:16:22.339Z'
});
const rentalPayload = new rental_1.Rental({
    id: 1,
    user_id: 1,
    book_id: 1,
    createdAt: '2024-01-26T14:16:22.339Z',
    updatedAt: '2024-01-26T14:16:22.339Z'
});
let accessTokenGlobal;
const userPayload = {
    id: 1,
    name: 'test',
    login: 'test',
    password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K',
    role: 'user',
    createdAt: '2024-01-26T14:16:22.339Z',
    updatedAt: '2024-01-26T14:16:22.339Z'
};
beforeAll(() => {
    process.env.ACCESS_TOKEN_SECRET = 'test';
    const SECRET = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jsonwebtoken_1.default.sign(userPayload, SECRET, { expiresIn: '1h' });
    accessTokenGlobal = accessToken;
});
describe('GET to /books/:id/rent/', () => {
    test('should respond with 422 status code when book already rented', () => __awaiter(void 0, void 0, void 0, function* () {
        const RentalRepositoryMock = jest.spyOn(rental_repository_1.default, 'findRentalByBookId')
            .mockResolvedValueOnce(rentalPayload);
        const BookRepositoryMock = jest
            .spyOn(book_repository_1.default, 'findBookById')
            .mockResolvedValueOnce(bookPayload);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .post('/books/1/rent/')
            .set('authorization', 'Bearer ' + accessTokenGlobal);
        expect(RentalRepositoryMock).toHaveBeenCalled;
        expect(BookRepositoryMock).toHaveBeenCalled;
        expect(statusCode).toBe(422);
    }));
});
describe('GET to /books/:id/return', () => {
    test('should respond with 200 status code book returned', () => __awaiter(void 0, void 0, void 0, function* () {
        const RentalRepositoryFindMock = jest
            .spyOn(rental_repository_1.default, 'findRentalByBookId')
            .mockResolvedValueOnce(rentalPayload);
        const RentalRepositoryDeleteMock = jest
            .spyOn(rental_repository_1.default, 'deleteRental')
            .mockResolvedValueOnce(1);
        const BookRepositoryMock = jest
            .spyOn(book_repository_1.default, 'findBookById')
            .mockResolvedValueOnce(bookPayload);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .post('/books/1/return')
            .set('authorization', 'Bearer ' + accessTokenGlobal);
        expect(RentalRepositoryFindMock).toHaveBeenCalled;
        expect(RentalRepositoryDeleteMock).toHaveBeenCalled;
        expect(BookRepositoryMock).toHaveBeenCalled;
        expect(statusCode).toBe(200);
    }));
});
