import { Request , Response } from "express"
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = (req: Request , res: Response) => {

    const authorization = req.headers.authorization;
    const token = authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({ message: "Unauthorized "})
    }

    const payload =  verifyToken(token);

    if(!payload){
        return res.status(401).json({ message: "Unauthorized"})
    }

    //@ts-ignore
    req.user = payload;
}