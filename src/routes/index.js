"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.includeRoutes = void 0;
const users_1 = __importDefault(require("./users"));
const contacts_1 = __importDefault(require("./contacts"));
const messages_1 = __importDefault(require("./messages"));
const auth_1 = __importDefault(require("./auth"));
const auth_2 = require("../middleware/auth");
const includeRoutes = (app) => {
    /* GET home page. */
    app.get('/', function (req, res, next) {
        res.status(200).send("SMS WEB API v1.0");
    });
    app.use('/users', users_1.default);
    app.use('/contacts', auth_2.authMiddleware, contacts_1.default);
    app.use('/messages', auth_2.authMiddleware, messages_1.default);
    app.use('/auth', auth_1.default);
};
exports.includeRoutes = includeRoutes;
