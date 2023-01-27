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
exports.createUserTokenController = void 0;
const apperrors_1 = require("../../apperrors");
const User_1 = require("../../schemas/User");
const sign_credentials_1 = require("../../services/auth/sign-credentials");
const create_user_token_1 = require("../../services/user-token/create-user-token");
const users_1 = require("../../services/users/users");
const schemaValidator_1 = require("../../utils/schemaValidator");
const createUserTokenController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, errors } = schemaValidator_1.schemaValidator.validate(req.body, User_1.UserGetTokenSchema);
        if (errors.length > 0) {
            throw errors;
        }
        const password = data.password;
        const dataWithoutPassword = data;
        delete dataWithoutPassword.password;
        const user = yield (0, users_1.findUser)(dataWithoutPassword);
        if (user == null) {
            throw [apperrors_1.appErrors.user.invalid_credentials];
        }
        if (!user.isCorrectPassword(password)) {
            throw [apperrors_1.appErrors.user.invalid_credentials];
        }
        const token = (0, sign_credentials_1.signCredentials)({
            email: user.email,
            phoneNumber: user.phoneNumber,
            password: password
        });
        yield (0, create_user_token_1.createUserToken)({
            UserId: user.id,
            token
        });
        res.status(201).json({
            success: true,
            message: "Token Created Successfully",
            data: {
                token
            }
        });
    }
    catch (e) {
        next(e);
    }
});
exports.createUserTokenController = createUserTokenController;
