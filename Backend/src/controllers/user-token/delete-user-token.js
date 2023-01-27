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
exports.deleteUserTokenController = void 0;
const delete_user_token_1 = require("../../services/user-token/delete-user-token");
const deleteUserTokenController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, delete_user_token_1.deleteUserToken)(req.customData.userToken.id);
        res.status(201).json({
            success: true,
            message: "Logged Out Successfully",
            data: {}
        });
    }
    catch (e) {
        next(e);
    }
});
exports.deleteUserTokenController = deleteUserTokenController;
