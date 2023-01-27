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
exports.sendMessage = exports.postMessage = void 0;
const Message_1 = require("../../models/Message");
const postMessage = (url, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': 'Basic'
        },
        body: data
    });
});
exports.postMessage = postMessage;
const sendMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    const sentMessage = {
        "phoneNumber": message.destinator,
        "message": message.msg,
    };
    (0, exports.postMessage)('https://asap-desk.com/api/v0/sms/message', sentMessage)
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Message_1.Message.create(message).then((message) => console.log(message.text + ' : has been sent'));
    }));
});
exports.sendMessage = sendMessage;
