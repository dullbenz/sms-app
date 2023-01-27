"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidator = void 0;
const apperrors_1 = require("../apperrors");
exports.schemaValidator = {
    // Validate data against a schema
    validate(data, schema) {
        const returnValue = {
            data: {},
            errors: []
        };
        const returnData = {};
        for (let key in schema) {
            if (schema[key].required) {
                if (data[key] == null) {
                    returnValue.errors.push(apperrors_1.appErrors.user.required.parse(key));
                    continue;
                }
            }
            if (typeof data[key] !== schema[key].type &&
                data[key] != null) {
                returnValue.errors.push(apperrors_1.appErrors.user.type_error.parse(key, schema[key].type));
                continue;
            }
            returnData[key] = data[key];
        }
        returnValue.data = returnData;
        return returnValue;
    }
};
