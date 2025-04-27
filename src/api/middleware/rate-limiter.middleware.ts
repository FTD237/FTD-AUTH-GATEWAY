import rateLimit from "express-rate-limit";
import { config } from '../../config'
import { Request } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../../types";
import { ApiError } from "../../utils/error-handler";

export const apiLimiter = rateLimit({
    windowMs: config.app.rateLimiter.windowMs,
    limit: config.app.rateLimiter.max,
    keyGenerator: (req: Request) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ,')[1];

            if (token) {
                const decoded = jwt.verify(
                    token,
                    config.app.jwt.secret
                ) as JwtPayload

                return decoded.service
            }
        } catch (error) {
            throw new ApiError(401, "Unauthorized");
        }

        return req.ip || 'anonymous'
    },
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        message: 'Too much request, please try later',
    }
})