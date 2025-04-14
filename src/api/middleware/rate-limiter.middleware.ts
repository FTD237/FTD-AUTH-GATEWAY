import rateLimit from "express-rate-limit";
import { config } from '../../config'

export const apiLimiter = rateLimit({
    windowMs: config.app.rateLimiter.windowMs,
    max: config.app.rateLimiter.max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        message: 'Too much request, please try later',
    }
})
