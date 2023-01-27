"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const default_1 = require("../../config/default");
const verifyUserToken = (token) => {
    return jsonwebtoken_1.default.verify(token, default_1.config.get('jwtPrivateKey'), {
        algorithms: ['HS256', 'HS384', 'HS512']
    });
};
exports.verifyUserToken = verifyUserToken;
