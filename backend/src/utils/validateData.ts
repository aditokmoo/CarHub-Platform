import { NextFunction, Request, Response } from "express";
import { userSchema } from "./zodSchema";

const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.body.work && typeof req.body.work === 'string') {
            req.body.work = JSON.parse(req.body.work);
        }
        console.log(req.body.group)
        if (req.body.group) {
            const data = {
                ...req.body,
                group: req.body.group.split(',')
            }
            userSchema.parse(data);
            next();
            return;
        }
        userSchema.parse(req.body)
        next();
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'Validation failed',
            errors: error
        });
    }
};

export const validateFiles = (req: Request, res: Response, next: NextFunction) => {
    const { images, profileImage } = req.files as Record<string, Express.Multer.File[]>;
    const allFiles = [...(images || []), ...(profileImage || [])];

    for (const file of allFiles) {
        if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
            return res.status(400).json({
                status: 'error',
                message: `Invalid file type. Only JPG, PNG, and WEBP are allowed.`,
            });
        }
    }

    next();
};