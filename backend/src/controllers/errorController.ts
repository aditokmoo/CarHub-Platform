import { NextFunction, Request, Response } from "express";
import { ErrorTypes } from "../types/errorTypes";
import AppError from "../utils/AppError";

export const errorController = (err: ErrorTypes, req: Request, res: Response, next: NextFunction) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'dev') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        })
    } else if (process.env.NODE_ENV === 'production') {

        if (err.name === 'CastError') return next(new AppError(`Invalid ${err.path}: ${err.value}.`, 400));
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            const message = `Invalid input data. ${errors.join('. ')}`
            return res.status(400).json({ status: 'fail', message })
        }

        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            })
        } else {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong!'
            })
        }
    }
}