"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
const sequelize_1 = require("sequelize");
const db_1 = require("../db");
const Contact_1 = require("./Contact");
const Message_1 = require("./Message");
const UserToken_1 = require("./UserToken");
exports.User = db_1.db.instance.define('User', {
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
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING
    }
});
// Hash Password before Saving to DB
exports.User.beforeCreate((user, options) => {
    // Creating a unique salt for a particular user 
    user.salt = crypto_1.default.randomBytes(16).toString('hex');
    // Hashing user's salt and password with 1000 iterations, 
    user.password = crypto_1.default.pbkdf2Sync(user.password, user.salt, 1000, 64, `sha512`).toString(`hex`);
});
// Add method to check password against hash
exports.User.prototype.isCorrectPassword = function (password) {
    let hash = crypto_1.default.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    return this.password === hash;
};
// Add instance method to hide password and salt before returning to frontend
exports.User.prototype.toJSON = function () {
    let pojo = Object.assign({}, this.get());
    delete pojo.password;
    delete pojo.salt;
    return pojo;
};
//User to Messages One to Many
exports.User.hasMany(Message_1.Message, { foreignKey: 'UserId' });
Message_1.Message.belongsTo(exports.User);
//User to contacts Many to Many
exports.User.hasMany(Contact_1.Contact, { foreignKey: 'UserId' });
Contact_1.Contact.belongsTo(exports.User);
// User has many tokens
exports.User.hasMany(UserToken_1.UserToken, { foreignKey: 'UserId' });
UserToken_1.UserToken.belongsTo(exports.User);
