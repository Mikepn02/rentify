"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3),
    lastName: zod_1.z.string().min(3),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8, "Password should be atleast 8 characters").regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
    role: zod_1.z.enum(["HOST", "RENTER"]).default("HOST"),
});
const validateUser = (data) => {
    const user = exports.userSchema.safeParse(data);
    if (!user.success) {
        throw new Error(user.error.errors[0].message);
    }
    return user.data;
};
exports.validateUser = validateUser;
