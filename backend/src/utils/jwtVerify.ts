import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { PrivateRequest } from "../types";

interface TokenInterface {
    UserInfo: {
        id: string,
    }
}

export const protect = async (req: PrivateRequest, res: Response, next: NextFunction) => {
    const headersJwt = req.headers?.authorization?.split(" ")?.at(1);
    if (!headersJwt) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    const token = jwt.verify(headersJwt, process.env.ACCESS_TOKEN!) as TokenInterface;

    const user = await User.findById(token.UserInfo.id);
    if (!user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    req.id = user._id.toString()
    next();
};
