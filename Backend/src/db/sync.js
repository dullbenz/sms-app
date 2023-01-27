"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.synchronizeDB = void 0;
const synchronizeDB = (models) => {
    models.forEach(model => {
        model.sync();
    });
};
exports.synchronizeDB = synchronizeDB;
