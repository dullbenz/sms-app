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
exports.deleteUser = exports.editUser = exports.findUser = exports.getAllUsers = exports.getUser = exports.saveUser = void 0;
const User_1 = require("../../models/User");
const saveUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield User_1.User.create(user);
    console.log(createdUser.firstName + ' has been created');
    return createdUser;
});
exports.saveUser = saveUser;
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.User.findByPk(id);
    return user;
});
exports.getUser = getUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_1.User.findAll();
    console.log("user: " + users);
    return users;
});
exports.getAllUsers = getAllUsers;
const findUser = (searchParams) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.findOne({ where: searchParams });
});
exports.findUser = findUser;
const editUser = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedInfo = yield User_1.User.update(user, {
        where: { id: id }
    });
    console.log('user has been updated');
    return updatedInfo;
});
exports.editUser = editUser;
/*export const updateUser =async (user:any,id:string) => {
    let change = User.findOne({where : {id :id}})
    
    await User.create(user).then(user=> console.log(user.firstName+'has been updated'))
    return user;
  }
  */
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield User_1.User.destroy({ where: { id: id } });
});
exports.deleteUser = deleteUser;
