"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUserMessagesController = void 0;
const get_messages_1 = require("../../services/messages/get-messages");
const listUserMessagesController = function (req, res, next) {
    try {
        const messages = (0, get_messages_1.getMessages)({ UserId: req.customData.user.id });
        res.status(200).json({
            data: {
                success: true,
                message: "Messages were fetched successfully",
                data: {
                    messages
                }
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.listUserMessagesController = listUserMessagesController;
