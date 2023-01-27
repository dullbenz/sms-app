"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const dayjs_1 = __importDefault(require("dayjs"));
// import config from 'config';
const default_1 = require("../config/default");
const isDevEnv = default_1.config.get('envMode') === 'development';
const logger = (0, pino_1.default)(Object.assign(Object.assign({}, isDevEnv && {
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
}), { base: {
        pid: false,
    }, timestamp: () => `,"time":"${(0, dayjs_1.default)().format()}"` }));
exports.default = logger;
