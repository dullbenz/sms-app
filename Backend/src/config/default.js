"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const dbFilePath = path_1.default.join(__dirname, "../../" + process.env.DB_FILE_PATH);
exports.config = new Map([
    ['envMode', process.env.NODE_ENV],
    ['port', process.env.PORT || 8081],
    ['dbFilePath', dbFilePath],
    ['jwtPrivateKey', process.env.JWT_PRIVATE_KEY]
]);
