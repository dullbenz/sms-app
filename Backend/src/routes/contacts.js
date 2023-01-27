"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contacts_1 = require("../controllers/contacts/contacts");
const router = (0, express_1.Router)();
/* GET contacts listing. */
router.get('/', contacts_1.getAllContactsController);
/** record a new contact in the database */
router.post('/', contacts_1.saveContactController);
/*get informations of the contact who wants to update his details */
router.get('/:id', contacts_1.getContactController);
router.put('/:id', contacts_1.editContactController);
/*delete the current contact */
router.delete('/:id', contacts_1.deleteContactController);
exports.default = router;
