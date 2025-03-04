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
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
/**
 *  A function to hash a password with bcrypt
 * @param password The password to hash
 * @returns
 */
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, bcrypt_1.hash)(password, 10);
    return hashedPassword;
});
exports.hashPassword = hashPassword;
/**
 * a function to compare a password with an encrypted password
 * @param password  The password to compare
 * @param encryptedPassword  The encrypted password to compare with
 * @returns  A boolean value
 */
const comparePassword = (password, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    if (!encryptedPassword)
        return false;
    return yield (0, bcrypt_1.compare)(password, encryptedPassword);
});
exports.comparePassword = comparePassword;
