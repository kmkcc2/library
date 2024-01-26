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
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SALT_ROUNDS = 10;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = bcryptjs_1.default.hashSync(req.body.password, SALT_ROUNDS);
    const user = {
        name: req.body.name,
        login: req.body.login,
        password: hash,
        role: 'user'
    };
    try {
        const userUnique = yield user_repository_1.default.findUserByLogin(user.login);
        if (userUnique) {
            return res.status(422).send({
                message: 'Login has already been taken.'
            });
        }
        const newUser = yield user_repository_1.default.createUser(user);
        return res.send(newUser);
    }
    catch (err) {
        if (err instanceof Error)
            console.log(err.message);
        return res.status(500).send({
            message: 'Internal Server Error'
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_repository_1.default.findUserByLogin(req.body.login);
    if (!user) {
        return res
            .status(404)
            .send({ message: 'User with provided login does not exist.' });
    }
    const payload = {
        id: user.id,
        name: user.name,
        login: user.login,
        role: user.role
    };
    if (bcryptjs_1.default.compareSync(req.body.password, user.password)) {
        const SECRET = process.env.ACCESS_TOKEN_SECRET;
        const accessToken = jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '1h' });
        return res.send({
            token: accessToken
        });
    }
    return res.status(401).send({ message: 'Password is invalid' });
});
exports.login = login;
