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
const bookPayload = new book_1.Book({
    id: -1,
    title: 'test',
    author: 'test',
    isbn: 'test',
    createdAt: '2024-01-26T14:16:22.339Z',
    updatedAt: '2024-01-26T14:16:22.339Z'
});
let accessTokenGlobal;
const userPayload = {
    id: -1,
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
describe('GET to /books/?filter=available', () => {
    test('should respond with 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const BookRepositoryMock = jest
            .spyOn(book_repository_1.default, 'findAllAvailable')
            .mockResolvedValueOnce([bookPayload]);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .get('/books/?filter=available')
            .set('authorization', 'Bearer ' + accessTokenGlobal);
        expect(BookRepositoryMock).toHaveBeenCalled();
        expect(statusCode).toBe(200);
    }));
});
describe('DELETE to /books/:id', () => {
    test('should respond with 401 status code when executed by regular user', () => __awaiter(void 0, void 0, void 0, function* () {
        const BookRepositoryMock = jest
            .spyOn(book_repository_1.default, 'findBookById')
            .mockResolvedValueOnce(bookPayload);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .delete('/books/1')
            .set('authorization', 'Bearer ' + accessTokenGlobal);
        expect(statusCode).toBe(401);
    }));
});
