"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserGetTokenSchema = exports.UserUpdateSchema = exports.UserCreateSchema = void 0;
exports.UserCreateSchema = {
    firstName: {
        type: "string",
        required: true,
    },
    lastName: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true,
    },
    phoneNumber: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    address: {
        type: "string",
        required: false,
    }
};
exports.UserUpdateSchema = {
    firstName: {
        type: "string",
        required: false,
    },
    lastName: {
        type: "string",
        required: false
    },
    address: {
        type: "string",
        required: false,
    }
};
exports.UserGetTokenSchema = {
    password: {
        type: "string",
        required: true
    },
    email: {
        type: "string",
        required: true
    }
};
