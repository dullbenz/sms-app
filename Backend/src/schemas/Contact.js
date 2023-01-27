"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUpdateSchema = exports.ContactCreateSchema = void 0;
exports.ContactCreateSchema = {
    firstName: {
        type: "string",
        required: true,
    },
    lastName: {
        type: "string",
        required: false
    },
    tel: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: false,
    },
    UserId: {
        type: "number",
        required: true
    }
};
exports.ContactUpdateSchema = {
    firstName: {
        type: "string",
        required: false,
    },
    lastName: {
        type: "string",
        required: false
    },
    tel: {
        type: "string",
        required: false,
    },
    email: {
        type: "string",
        required: false,
    }
};
