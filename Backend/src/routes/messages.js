"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const send_message_1 = require("../controllers/messages/send-message");
const router = (0, express_1.Router)();
router.post('/send', send_message_1.sendMessageController);
exports.default = router;
