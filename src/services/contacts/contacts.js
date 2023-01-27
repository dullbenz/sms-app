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
exports.deleteContact = exports.editContact = exports.getAllContacts = exports.getContact = exports.saveContact = void 0;
const Contact_1 = require("../../models/Contact");
const saveContact = (contact) => __awaiter(void 0, void 0, void 0, function* () {
    const savedContact = yield Contact_1.Contact.create(contact);
    console.log(contact.firstName + ' has been created');
    return savedContact;
});
exports.saveContact = saveContact;
const getContact = (searchParam) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield Contact_1.Contact.findOne({ where: searchParam });
    return contact;
});
exports.getContact = getContact;
const getAllContacts = (searchParams) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = Contact_1.Contact.findAll({ where: searchParams });
    return contacts;
});
exports.getAllContacts = getAllContacts;
const editContact = (contact, searchParam) => __awaiter(void 0, void 0, void 0, function* () {
    const updateInfo = yield Contact_1.Contact.update(contact, {
        where: searchParam
    });
    console.log('contact has been updated');
    return updateInfo;
});
exports.editContact = editContact;
/*export const updateContact =async (contact:any,id:string) => {
    let change = Contact.findOne({where : {id :id}})
    
    await Contact.create(contact).then(contact=> console.log(contact.firstName+'has been updated'))
    return contact;
  }
  */
const deleteContact = (searchParam) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Contact_1.Contact.destroy({ where: searchParam });
});
exports.deleteContact = deleteContact;
