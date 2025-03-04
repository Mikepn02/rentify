"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("../utils/jwt");
const isAuthenticated = (req, res) => {
    const authorization = req.headers.authorization;
    const token = authorization === null || authorization === void 0 ? void 0 : authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized " });
    }
    const payload = (0, jwt_1.verifyToken)(token);
    if (!payload) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    //@ts-ignore
    req.user = payload;
};
