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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const sequelize_1 = require("sequelize");
const SALT_ROUNDS = 10;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = bcryptjs_1.default.hashSync(req.body.password, SALT_ROUNDS);
    const user = {
        name: req.body.name,
        login: req.body.login,
        password: hash,
        role: req.body.role
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
exports.create = create;
const findAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send(yield user_repository_1.default.findAll());
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
        const user = yield user_repository_1.default.findUserById(id);
        if (user !== null)
            return res.send(user);
        return res.status(404).send({
            message: `Cannot find user with id: ${id}`
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
    try {
        const id = req.params.id;
        if (id === null)
            throw new Error('Id must be specified');
        const oldUser = yield user_repository_1.default.findUserById(id);
        if (oldUser === null) {
            return res.status(404).send({
                message: 'User not found.'
            });
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(404).send({
                message: `Cannot update User with id=${id}, req.body is empty!`
            });
        }
        if (Object.prototype.hasOwnProperty.call(req.body, 'role')) {
            return res.status(403).send({
                message: `Permisson denied, role cannot be changed.`
            });
        }
        const newPassword = Object.prototype.hasOwnProperty.call(req.body, 'password')
            ? bcryptjs_1.default.hashSync(req.body.password, SALT_ROUNDS)
            : oldUser.password;
        const userBody = {
            name: Object.prototype.hasOwnProperty.call(req.body, 'name')
                ? req.body.name
                : oldUser.name,
            login: Object.prototype.hasOwnProperty.call(req.body, 'login')
                ? req.body.login
                : oldUser.login,
            role: oldUser.role,
            password: newPassword
        };
        const response = yield user_repository_1.default.updateUser(id, userBody);
        if (response !== null) {
            return res.send({
                message: 'User was updated successfully.'
            });
        }
        throw new Error();
    }
    catch (err) {
        console.log(err);
        if (err instanceof sequelize_1.ValidationError) {
            return res.status(422).send({
                message: err.errors[0].message
            });
        }
        return res.status(500).send({
            message: 'Internal Server Error.'
        });
    }
});
exports.update = update;
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (id === null)
            throw new Error('Id must be specified');
        const response = yield user_repository_1.default.deleteUser(id);
        if (response === 1) {
            return res.send({
                message: 'User was deleted successfully!'
            });
        }
        return res.status(404).send({
            message: `User with id: ${id} not found.`
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
