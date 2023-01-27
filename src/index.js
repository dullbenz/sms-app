"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const default_1 = require("./config/default");
const db_1 = require("./db");
const app_1 = require("./app");
const logger_1 = __importDefault(require("./logger"));
const connect_1 = require("./db/connect");
const sync_1 = require("./db/sync");
const port = default_1.config.get("port");
const app = (0, express_1.default)();
(0, app_1.initializeApp)(app);
// Server setup
app.listen(port, () => {
    logger_1.default.info(`Express server started on http://localhost:${port}/`);
});
// Connect to Database and sync models
db_1.db.instance = (0, connect_1.createDbConnection)();
Promise.resolve().then(() => __importStar(require("./models"))).then(models => {
    (0, sync_1.synchronizeDB)(models.default);
});
