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
exports.sendMessageController = void 0;
const Message_1 = require("../../models/Message");
const send_message_1 = require("../../services/messages/send-message");
const sendMessageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // TODO validate body
        yield (0, send_message_1.sendMessage)(req.body);
        res.status(200).json({
            success: true,
            message: "Message sent successfully",
            data: yield Message_1.Message.findByPk(req.body.id)
        });
    }
    catch (error) {
        next(error);
    }
});
exports.sendMessageController = sendMessageController;
