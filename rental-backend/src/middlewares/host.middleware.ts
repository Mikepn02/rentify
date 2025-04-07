import { Request, Response, NextFunction, RequestHandler } from 'express';



const restrictTo  = (...roles: string[]): RequestHandler => {
    return (req, res,next) => {
        const typedReq = req;
        if (!typedReq.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        //@ts-ignore
        if (!roles.includes(typedReq.user.role)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    }
}

export default restrictTo;