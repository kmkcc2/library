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
const user_1 = require("../src/models/user");
const user_repository_1 = __importDefault(require("../src/repositories/user.repository"));
const app_1 = __importDefault(require("../app"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userPayload = {
    id: 1,
    name: 'test',
    login: 'test',
    password: '$2a$10$wi8X/E01k8jVJgNdwQexZeN0QVbESrgIVXim1yRfL9QAnM73j2.6K',
    role: 'admin',
    createdAt: '2024-01-26T14:16:22.339Z',
    updatedAt: '2024-01-26T14:16:22.339Z'
};
const user = new user_1.User(userPayload);
let accessTokenGlobal = '';
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    process.env.ACCESS_TOKEN_SECRET = 'test';
    const SECRET = process.env.ACCESS_TOKEN_SECRET;
    const accessToken = jsonwebtoken_1.default.sign(userPayload, SECRET, { expiresIn: '1h' });
    accessTokenGlobal = accessToken;
}));
describe('POST to /login', () => {
    test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest.spyOn(user_repository_1.default, 'findUserByLogin').mockResolvedValueOnce(user);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).post('/login').send({
            login: 'test',
            password: 'qwerty123'
        });
        expect(statusCode).toBe(200);
        expect(UserRepositoryMock).toHaveBeenCalled();
    }));
    test('should respond with a 404 when login invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest.spyOn(user_repository_1.default, 'findUserByLogin').mockResolvedValueOnce(null);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).post('/login').send({
            login: 'test',
            password: 'qwerty123'
        });
        expect(statusCode).toBe(404);
        expect(UserRepositoryMock).toHaveBeenCalled();
    }));
    test('should respond with a 401 when password invalid', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest.spyOn(user_repository_1.default, 'findUserByLogin').mockResolvedValueOnce(user);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default).post('/login').send({
            login: 'test',
            password: 'invalidPassword'
        });
        expect(statusCode).toBe(401);
        expect(UserRepositoryMock).toHaveBeenCalled();
    }));
});
describe('POST to /register', () => {
    test('should respond with 400 when user payload is incorrect', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserFindByLoginMock = jest
            .spyOn(user_repository_1.default, 'findUserByLogin')
            .mockResolvedValue(user);
        const { statusCode } = yield (0, supertest_1.default)(app_1.default)
            .post('/register')
            .send({ login: 'asd', password: 'pass' });
        expect(UserFindByLoginMock).toHaveBeenCalled();
        expect(statusCode).toBe(400);
    }));
    test('should respond with 200 status code and return new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const UserRepositoryMock = jest
            .spyOn(user_repository_1.default, 'createUser')
            .mockResolvedValueOnce(user);
        const UserFindByLoginMock = jest
            .spyOn(user_repository_1.default, 'findUserByLogin')
            .mockResolvedValue(null);
        const { statusCode, body } = yield (0, supertest_1.default)(app_1.default).post('/register').send({
            name: 'test',
            login: 'test',
            role: 'admin',
            password: 'password'
        });
        expect(UserFindByLoginMock).toHaveBeenCalled();
        expect(UserRepositoryMock).toHaveBeenCalled();
        expect(body.role).toBe('admin');
        expect(statusCode).toBe(200);
    }));
});
