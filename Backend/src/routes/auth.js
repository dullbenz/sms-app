"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const create_user_token_1 = require("../controllers/user-token/create-user-token");
const delete_user_token_1 = require("../controllers/user-token/delete-user-token");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
/* Get new token for User */
router.post('/login', create_user_token_1.createUserTokenController);
router.post('/logout', auth_1.authMiddleware, delete_user_token_1.deleteUserTokenController);
exports.default = router;
