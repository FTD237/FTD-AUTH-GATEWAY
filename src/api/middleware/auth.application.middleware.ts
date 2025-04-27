import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../types";
import {appConfig} from "../../config/app.config";
import { logger } from "../../utils/logger";

interface CustomRequest extends Request {
    service?: string;
}

export const verifyToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        res.status(401).json({
            status: 'error',
            message: 'Access token is required'
        })
        logger.warning(`Access token is required`)
        return
    }

    try {
        const decoded = jwt.verify(
            token,
            appConfig.jwt.secret
        ) as JwtPayload;

        req.service = decoded.service;

        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({
                status: 'error',
                message: 'Token has expired',
                code: 'TOKEN_EXPIRED'
            })
            logger.warning(`Token has expired`)
        }

        res.status(403).json({
            status: 'error',
            message: 'Invalid token',
            code: 'INVALID_TOKEN'
        })
        logger.warning(`Invalid token`)
    }
}