'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./user");
const book_1 = require("./book");
const rental_1 = require("./rental");
const sequelize_typescript_1 = require("sequelize-typescript");
const process_1 = __importDefault(require("process"));
const config_js_1 = __importDefault(require("../config/config.js"));
const env = (_a = process_1.default.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
const configEnv = config_js_1.default[env];
const sequelize = new sequelize_typescript_1.Sequelize(configEnv.database, configEnv.username, configEnv.password, {
    host: configEnv.host,
    dialect: configEnv.dialect,
    port: configEnv.port
});
sequelize.addModels([user_1.User, book_1.Book, rental_1.Rental]);
exports.default = sequelize;
