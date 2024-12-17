import { Request, Response } from "express";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: { status: 'fail', message: 'To many login attemps, please try again after 60 second pause' },
    handler: (req: Request, res: Response, options: any) => {
        return res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false
});

export default loginLimiter