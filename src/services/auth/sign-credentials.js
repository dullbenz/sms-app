"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signCredentials = void 0;
const default_1 = require("../../config/default");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signCredentials = (data) => {
    const token = jsonwebtoken_1.default.sign({
        data
    }, default_1.config.get('jwtPrivateKey'), {
        expiresIn: '1h',
        algorithm: 'HS512'
    });
    return token;
};
exports.signCredentials = signCredentials;
