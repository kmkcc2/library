"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: {
        notEmpty: true,
        isString: true,
        errorMessage: 'Name must not be empty'
    },
    login: {
        notEmpty: true,
        errorMessage: 'Login must not be empty'
    },
    password: {
        notEmpty: true,
        isLength: {
            options: { min: 8 },
            errorMessage: 'Password should be at least 8 chars'
        }
    }
};
