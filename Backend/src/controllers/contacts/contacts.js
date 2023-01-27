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
exports.deleteContactController = exports.editContactController = exports.getAllContactsController = exports.getContactController = exports.saveContactController = void 0;
const Contact_1 = require("../../schemas/Contact");
const contacts_1 = require("../../services/contacts/contacts");
const schemaValidator_1 = require("../../utils/schemaValidator");
const apperrors_1 = require("../../apperrors");
const saveContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data, errors } = schemaValidator_1.schemaValidator.validate(Object.assign(Object.assign({}, req.body), { UserId: req.customData.user.id }), Contact_1.ContactCreateSchema);
        if (errors.length > 0) {
            throw errors;
        }
        const savedContact = yield (0, contacts_1.saveContact)(data);
        res.status(201).json({
            success: true,
            message: "Contact saved successfully",
            data: {
                contact: savedContact
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.saveContactController = saveContactController;
const getContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const contact = yield (0, contacts_1.getContact)({ id: Number(id), UserId: req.customData.user.id });
        if (contact == null) {
            throw [apperrors_1.appErrors.contact.not_found];
        }
        res.status(200).json({
            success: true,
            message: "Contact fetched successfully",
            data: {
                contact
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getContactController = getContactController;
const getAllContactsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contacts = yield (0, contacts_1.getAllContacts)({ UserId: req.customData.user.id });
        res.status(200).json({
            success: true,
            message: "Contacts fetched successfully",
            data: {
                contacts
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllContactsController = getAllContactsController;
const editContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { data, errors } = schemaValidator_1.schemaValidator.validate(req.body, Contact_1.ContactUpdateSchema);
        if (errors.length > 0) {
            throw errors;
        }
        const updated_count = yield (0, contacts_1.editContact)(data, { id: Number(id), UserId: req.customData.user.id });
        if (!(updated_count === null || updated_count === void 0 ? void 0 : updated_count[0])) {
            throw [apperrors_1.appErrors.contact.not_found];
        }
        res.status(200).json({
            success: true,
            message: "Contact(s) updated successfully",
            data: {
                updated_count: (updated_count === null || updated_count === void 0 ? void 0 : updated_count[0]) || 0,
                contact: yield (0, contacts_1.getContact)({ id: Number(id), UserId: req.customData.user.id })
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.editContactController = editContactController;
const deleteContactController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleted_count = yield (0, contacts_1.deleteContact)({ id: Number(id), UserId: req.customData.user.id });
        if (!deleted_count) {
            throw [apperrors_1.appErrors.contact.not_found];
        }
        res.status(200).json({
            success: true,
            message: "Contact(s) deleted successfully",
            data: {
                deleted_count
            }
        });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteContactController = deleteContactController;
