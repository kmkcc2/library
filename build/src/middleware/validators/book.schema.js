"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putValidation = exports.createValidation = void 0;
exports.createValidation = {
    name: {
        notEmpty: true,
        errorMessage: 'login must not be empty'
    },
    isbn: {
        notEmpty: true,
        errorMessage: 'isbn must not be empty'
    },
    author: {
        notEmpty: true,
        errorMessage: 'author must not be empty'
    }
};
exports.putValidation = {
    name: {
        optional: true,
        notEmpty: true,
        isString: true
    },
    isbn: {
        optional: true,
        notEmpty: true
    },
    author: {
        optional: true,
        notEmpty: true,
        isString: true
    }
};
