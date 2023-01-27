"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users/users");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/* GET users listing. */
// router.get('/', authMiddleware, getAllUsersController);
/** record a new user in the database */
router.post('/', users_1.saveUserController);
/*get informations of the user who wants to update his details */
router.get('/me', auth_1.authMiddleware, users_1.getUserController);
router.put('/me', auth_1.authMiddleware, users_1.editUserController);
/*delete the current user */
router.delete('/me', auth_1.authMiddleware, users_1.deleteUserController);
exports.default = router;
