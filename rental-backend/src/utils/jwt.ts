import jwt from "jsonwebtoken"

interface JwtPayload {
  id: string;
  role: string;
  email: string;
}

export const generateToken = (payload: JwtPayload): string => {
     return jwt.sign(payload, process.env.JWT_SECRET as string)
}

export const verifyToken = (token: string) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      console.error("JWT Verification Failed:", error);
      return null;
    }
  };
export const extractPayload = (token: string) => {
    const payload = verifyToken(token);
    return payload;
}