import jwt from "jsonwebtoken"

export const generateToken = (userId: string): string => {
     return jwt.sign(userId, process.env.JWT_SECRET as string)
}

export const verifyToken = (token: string) => {
    return jwt.verify(token , process.env.JWT_SECRET as string)
}

export const extractPayload = (token: string) => {
    const payload = verifyToken(token);
    return payload;
}