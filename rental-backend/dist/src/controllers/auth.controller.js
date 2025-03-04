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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = require("../utils/validator");
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class AuthController {
}
_a = AuthController;
/*
  #swagger.tags = ['Auth']
   */
AuthController.register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = (0, validator_1.validateUser)(req.body);
        const existingUser = yield prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (existingUser) {
            return res.status(400).json({
                message: "User with that email already exists",
            });
        }
        const newUser = yield prisma.user.create({
            data: Object.assign(Object.assign({}, user), { password: yield (0, bcrypt_1.hashPassword)(user.password) }),
        });
        res.status(201).json({
            success: true,
            message: "successfully registered!!",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
/*
  #swagger.tags = ['Auth']
   */
AuthController.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password",
            });
        }
        if (user.password === null) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = yield (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }
        const token = (0, jwt_1.generateToken)(user.id);
        res.setHeader("Authorization", `Bearer ${token}`);
        res.status(200).json({
            success: true,
            message: "successfully logged in",
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
        });
    }
});
exports.default = AuthController;
