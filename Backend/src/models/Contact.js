"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const Message_1 = require("./Message");
exports.Contact = db_1.db.instance.define('Contact', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    tel: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
});
// Message to Contact Many to One
exports.Contact.hasMany(Message_1.Message, { foreignKey: 'ContactId' });
Message_1.Message.belongsTo(exports.Contact);
