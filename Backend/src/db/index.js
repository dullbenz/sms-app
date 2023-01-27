"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const logger_1 = __importDefault(require("../logger"));
const default_1 = require("../config/default");
// Singleton Implementation
const filepath = default_1.config.get("dbFilePath");
exports.db = {
    instance: new sequelize_1.Sequelize({
        dialect: 'sqlite',
        storage: filepath,
        logging: logger_1.default.debug
    })
};
