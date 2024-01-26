"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authorize_1 = require("../middleware/authorize");
const accountRoles_1 = require("../common/accountRoles");
const router = express_1.default.Router();
router.route('/')
    .post((0, authorize_1.authorize)(accountRoles_1.Role.Admin), user_controller_1.create)
    .get((0, authorize_1.authorize)(accountRoles_1.Role.Admin), user_controller_1.findAll);
router.route('/:id')
    .get((0, authorize_1.authorize)(accountRoles_1.Role.Admin), user_controller_1.findOne)
    .put((0, authorize_1.authorize)(accountRoles_1.Role.Admin), user_controller_1.update)
    .delete((0, authorize_1.authorize)(accountRoles_1.Role.Admin), user_controller_1.destroy);
exports.default = router;
