"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
exports.Message = db_1.db.instance.define('Message', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    msg: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    destinator: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
