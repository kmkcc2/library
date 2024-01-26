"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeAdminOrUser = exports.authorizeAdminOnly = exports.authorizeUserOnly = void 0;
const jsonwebtoken_1 = __importStar(require("jsonwebtoken"));
const jsonwebtoken_2 = require("jsonwebtoken");
function authorizeUserOnly(req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        const SECRET = process.env.ACCESS_TOKEN_SECRET;
        if (token === null)
            return res.status(401).send({ message: 'Unauthorized' });
        jsonwebtoken_1.default.verify(token, SECRET, (err, user) => {
            if (err != null) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    return res
                        .status(403)
                        .send({ message: 'Token has expired, please sign in again' });
                }
                return res.status(403).send({ message: 'Invalid token signature' });
            }
            const decoded = (0, jsonwebtoken_2.decode)(token);
            if (decoded !== null &&
                Object.prototype.hasOwnProperty.call(decoded, 'role') &&
                decoded.role !== 'user') {
                return res.status(401).send({ message: 'Unauthorized' });
            }
            next();
        });
    }
    catch (err) {
        const msg = err instanceof Error ? 'Unauthorized. ' + err.message : 'Unauthorized';
        return res.status(401).send({ message: msg });
    }
}
exports.authorizeUserOnly = authorizeUserOnly;
function authorizeAdminOnly(req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        const SECRET = process.env.ACCESS_TOKEN_SECRET;
        if (token === null)
            return res.status(401).send({ message: 'Unauthorized' });
        jsonwebtoken_1.default.verify(token, SECRET, (err, user) => {
            if (err !== null) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    return res
                        .status(403)
                        .send({ message: 'Token has expired, please sign in again' });
                }
                return res.status(403).send({ message: 'Invalid token signature' });
            }
            const decoded = (0, jsonwebtoken_2.decode)(token);
            if (decoded !== null &&
                Object.prototype.hasOwnProperty.call(decoded, 'role') &&
                decoded.role !== 'admin') {
                return res.status(401).send({ message: 'Unauthorized' });
            }
            next();
        });
    }
    catch (err) {
        const msg = err instanceof Error ? 'Unauthorized. ' + err.message : 'Unauthorized';
        return res.status(401).send({ message: msg });
    }
}
exports.authorizeAdminOnly = authorizeAdminOnly;
function authorizeAdminOrUser(req, res, next) {
    const authHeader = req.headers.authorization;
    try {
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }
        const token = authHeader.split(' ')[1];
        const SECRET = process.env.ACCESS_TOKEN_SECRET;
        if (token === null)
            return res.status(401).send({ message: 'Unauthorized' });
        jsonwebtoken_1.default.verify(token, SECRET, (err, user) => {
            if (err !== null) {
                if (err instanceof jsonwebtoken_1.TokenExpiredError) {
                    return res
                        .status(403)
                        .send({ message: 'Token has expired, please sign in again' });
                }
                return res.status(403).send({ message: 'Invalid token signature' });
            }
            next();
        });
    }
    catch (err) {
        const msg = err instanceof Error ? 'Unauthorized. ' + err.message : 'Unauthorized';
        return res.status(401).send({ message: msg });
    }
}
exports.authorizeAdminOrUser = authorizeAdminOrUser;
