"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const authorize_1 = require("../middleware/authorize");
const router = express_1.default.Router();
router.route('/')
    .post(authorize_1.authorizeAdminOnly, user_controller_1.create)
    .get(authorize_1.authorizeAdminOnly, user_controller_1.findAll);
router.route('/:id')
    .get(authorize_1.authorizeAdminOnly, user_controller_1.findOne)
    .put(authorize_1.authorizeAdminOrUser, user_controller_1.update)
    .delete(authorize_1.authorizeAdminOrUser, user_controller_1.destroy);
exports.default = router;
