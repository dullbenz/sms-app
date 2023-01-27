"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserToken = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.UserToken = db_1.db.instance.define('UserToken', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
