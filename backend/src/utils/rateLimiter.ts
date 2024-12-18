import { Request, Response } from "express";
import rateLimit from 'express-rate-limit';

export const createAccountLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 10,  // Limit to 10 requests per 15 minutes per IP
    message: 'Too many accounts created from this IP, please try again later.'
});


export const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { status: 'fail', message: 'To many login attemps, please try again after 60 second pause' },
    handler: (req: Request, res: Response, options: any) => {
        return res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false
});