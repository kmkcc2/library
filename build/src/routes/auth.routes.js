"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const request_validator_1 = require("../middleware/request.validator");
const login_schema_1 = __importDefault(require("../middleware/validators/login.schema"));
const register_schema_1 = __importDefault(require("../middleware/validators/register.schema"));
const router = express_1.default.Router();
router.route('/register')
    .post((0, request_validator_1.validateRequest)(register_schema_1.default), auth_controller_1.register);
router.route('/login')
    .post((0, request_validator_1.validateRequest)(login_schema_1.default), auth_controller_1.login);
exports.default = router;
