"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorize_1 = require("../middleware/authorize");
const accountRoles_1 = require("../common/accountRoles");
const book_controller_1 = require("../controllers/book.controller");
const rental_controller_1 = require("../controllers/rental.controller");
const request_validator_1 = require("../middleware/request.validator");
const book_schema_1 = require("../middleware/validators/book.schema");
const router = express_1.default.Router();
router.route('/')
    .post((0, authorize_1.authorize)(accountRoles_1.Role.Admin), (0, request_validator_1.validateRequest)(book_schema_1.createValidation), book_controller_1.create)
    .get((0, authorize_1.authorize)(), book_controller_1.findAll);
router.route('/:id')
    .get((0, authorize_1.authorize)(), book_controller_1.findOne)
    .put((0, authorize_1.authorize)(accountRoles_1.Role.Admin), (0, request_validator_1.validateRequest)(book_schema_1.putValidation), book_controller_1.update)
    .delete((0, authorize_1.authorize)(accountRoles_1.Role.Admin), book_controller_1.destroy);
router.route('/:id/rent')
    .post((0, authorize_1.authorize)(accountRoles_1.Role.User), rental_controller_1.rentBook);
router.route('/:id/return')
    .post((0, authorize_1.authorize)(accountRoles_1.Role.User), rental_controller_1.returnBook);
exports.default = router;
