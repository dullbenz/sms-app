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
exports.authMiddleware = void 0;
const apperrors_1 = require("../apperrors");
const check_user_token_1 = require("../services/auth/check-user-token");
const verify_user_token_1 = require("../services/auth/verify-user-token");
const users_1 = require("../services/users/users");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer ')) {
            throw [apperrors_1.appErrors.auth.unauthorized];
        }
        const authorization = req.headers.authorization;
        const token = authorization.replace(/^Bearer\s+/, '');
        const userToken = yield (0, check_user_token_1.checkUserToken)(token);
        if (userToken == null) {
            throw [apperrors_1.appErrors.auth.unauthorized];
        }
        let payload;
        try {
            payload = (0, verify_user_token_1.verifyUserToken)(userToken.token);
        }
        catch (e) {
            throw [apperrors_1.appErrors.auth.expired_token];
        }
        const user = yield (0, users_1.getUser)(userToken.UserId);
        if (user == null ||
            user.email !== payload.data.email ||
            user.phoneNumber !== payload.data.phoneNumber ||
            !user.isCorrectPassword(payload.data.password)) {
            throw [apperrors_1.appErrors.auth.unauthorized];
        }
        req.customData = {
            userToken,
            user
        };
        next();
    }
    catch (e) {
        next(e);
    }
});
exports.authMiddleware = authMiddleware;
