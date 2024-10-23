import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { AppointmentRequest } from "../types";

export const protect = async (req: AppointmentRequest, res: Response, next: NextFunction) => {
    const headersJwt = req.headers.authorization?.split(" ")?.at(1);
    if (!headersJwt) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    const token = await jwt.verify(headersJwt, process.env.ACCESS_TOKEN!);

    const user = await User.findById((token as { UserInfo: { id: string } }).UserInfo.id);
    if (!user) return res.status(401).json({ status: 'error', message: 'Unauthorized' });

    req.id = user._id;
    next();
};
