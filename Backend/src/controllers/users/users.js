"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserController = exports.editUserController = exports.getAllUsersController = exports.getUserController = exports.saveUserController = void 0;
const apperrors_1 = require("../../apperrors");
const User_1 = require("../../models/User");
const User_2 = require("../../schemas/User");
const create_user_token_1 = require("../../services/user-token/create-user-token");
const users_1 = require("../../services/users/users");
const schemaValidator_1 = require("../../utils/schemaValidator");
const sign_credentials_1 = require("../../services/auth/sign-credentials");
const sequelize_1 = require("sequelize");
const saveUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, errors } = schemaValidator_1.schemaValidator.validate(req.body, User_2.UserCreateSchema);
        if (errors.length > 0) {
            throw errors;
        }
        if (data.email || data.phoneNumber) {
            const existsUser = yield (0, users_1.findUser)({ [sequelize_1.Op.or]: [
                    ...data.email && [{ email: data.email }],
                    ...data.phoneNumber && [{ phonenumber: data.phoneNumber }]
                ] });
            if (existsUser != null) {
                throw [apperrors_1.appErrors.user.exists];
            }
        }
        const user = yield (0, users_1.saveUser)(data);
        // Create auth token for user
        const token = (0, sign_credentials_1.signCredentials)({
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: data.password
        });
        yield (0, create_user_token_1.createUserToken)({
            UserId: user.id,
            token
        });
        res.status(201).json({
            success: true,
            message: "user saved successfully",
            data: {
                user,
                token
            }
        });
    }
    catch (e) {
        next(e);
    }
});
exports.saveUserController = saveUserController;
const getUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { id } = req.params;
        // const user = await getUser(Number(id));
        res.json({
            success: true,
            message: "User fetched successfully",
            data: {
                user: req.customData.user
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserController = getUserController;
const getAllUsersController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.getAllUsers)();
        res.json({
            success: true,
            message: "Users fetched successfully",
            data: {
                users
            }
        });
        console.log("res: " + res);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsersController = getAllUsersController;
const editUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { id } = req.params;
        const { data, errors } = schemaValidator_1.schemaValidator.validate(req.body, User_2.UserUpdateSchema);
        if (errors.length > 0) {
            throw errors;
        }
        const updatedCount = yield (0, users_1.editUser)(data, req.customData.user.id);
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: {
                updated_count: (updatedCount === null || updatedCount === void 0 ? void 0 : updatedCount[0]) || 0,
                user: yield User_1.User.findByPk(req.customData.user.id)
            }
        });
    }
    catch (e) {
        next(e);
    }
});
exports.editUserController = editUserController;
const deleteUserController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { id } = req.params;
        const deletedCount = yield (0, users_1.deleteUser)(Number(req.customData.user.id));
        res.json({
            success: true,
            message: "Account successfully closed",
            data: {
                deleted_count: deletedCount
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUserController = deleteUserController;
