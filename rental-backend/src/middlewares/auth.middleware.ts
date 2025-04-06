import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token;
  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res.status(401).json({ message: "Unauthorized " });
  }

  const payload = verifyToken(token);


  if (!payload) {
    return res.status(401).json({ message: "Unauthorized" });
  }


  req.user = payload;
  next();
};
