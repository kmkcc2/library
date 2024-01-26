"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorize_1 = require("../middleware/authorize");
const book_controller_1 = require("../controllers/book.controller");
const rental_controller_1 = require("../controllers/rental.controller");
const router = express_1.default.Router();
router.route('/')
    .post(authorize_1.authorizeAdminOnly, book_controller_1.create)
    .get(authorize_1.authorizeAdminOrUser, book_controller_1.findAll);
router.route('/:id')
    .get(authorize_1.authorizeAdminOrUser, book_controller_1.findOne)
    .put(authorize_1.authorizeAdminOnly, book_controller_1.update)
    .delete(authorize_1.authorizeAdminOnly, book_controller_1.destroy);
router.route('/:id/rent')
    .post(authorize_1.authorizeUserOnly, rental_controller_1.rentBook);
router.route('/:id/return')
    .post(authorize_1.authorizeUserOnly, rental_controller_1.returnBook);
exports.default = router;
