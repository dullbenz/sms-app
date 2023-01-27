"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDbConnection = void 0;
const default_1 = require("../config/default");
const logger_1 = __importDefault(require("../logger"));
const sequelize_1 = require("sequelize");
const filepath = default_1.config.get("dbFilePath");
const createDbConnection = () => {
    const sequelize = new sequelize_1.Sequelize({
        dialect: 'sqlite',
        storage: filepath,
        logging: logger_1.default.debug
    });
    sequelize
        .authenticate()
        .then(() => {
        logger_1.default.info("Connection with SQLite has been established");
    })
        .catch((error) => {
        logger_1.default.error("Unable to Connect to the database");
        logger_1.default.error(error.message);
    });
    return sequelize;
};
exports.createDbConnection = createDbConnection;
