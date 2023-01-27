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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainErorHandler = void 0;
const apperrors_1 = require("../apperrors");
const default_1 = require("../config/default");
const logger_1 = __importDefault(require("../logger"));
const mainErorHandler = (errs, req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (Array.isArray(errs)) {
        const statusCode = errs[0].statusCode;
        if (statusCode) {
            return res.status(statusCode).json({
                success: false,
                errors: errs
            });
        }
        res.status(400).json({
            success: false,
            errors: errs
        });
    }
    else {
        if (default_1.config.get("envMode") !== 'production') {
            logger_1.default.error(errs);
        }
        res.status(500).json({
            success: false,
            errors: [apperrors_1.appErrors.general.unknown_error]
        });
    }
});
exports.mainErorHandler = mainErorHandler;
