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
const RentalModel = index_1.default.models.Rental;
class RentalRepository {
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RentalModel.findAll();
        });
    }
    static findRentalByBookId(book_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RentalModel.findOne({ where: { book_id } });
        });
    }
    static findRentalByUserId(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RentalModel.findOne({ where: { user_id } });
        });
    }
    static findRentalById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RentalModel.findByPk(id);
        });
    }
    static createRental(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RentalModel.create(payload);
        });
    }
    static deleteRental(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield RentalModel.destroy({ where: { id } });
        });
    }
}
exports.default = RentalRepository;
