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
const index_1 = __importDefault(require("../models/index"));
const UserModel = index_1.default.models.User;
class UserRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.findAll();
        });
    }
    static findUserByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.findOne({ where: { name } });
        });
    }
    static findUserByLogin(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.findOne({ where: { login } });
        });
    }
    static findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.findByPk(id);
        });
    }
    static createUser(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.create(payload);
        });
    }
    static updateUser(id, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.update(payload, {
                where: { id }
            });
        });
    }
    static deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield UserModel.destroy({ where: { id } });
        });
    }
}
exports.default = UserRepository;
