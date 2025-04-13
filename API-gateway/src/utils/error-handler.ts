import { Request, Response, NextFunction } from "express";
import { logger } from "./logger";
import {appConfig} from "../config/app.config";


export class ApiError extends Error {
    /**
     * To handle all ApiErrors
     *
     * @remarks
     */
    statusCode: number;
    isOperational: boolean;

    constructor(
        statusCode: number,
        message: string,
        isOperational: boolean = true,
        stack?: string
    ) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }
}

export const errorHandler = (err: Error | ApiError, req: Request, res: Response, next: NextFunction)=> {
    logger.error(`${req.method} ${req.url} ${err.message}`);

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        })
    }

    return res.status(500).json({
        status: 'error',
        message: appConfig.environment === 'development' ? err.message : 'Internal server error',
    })
}