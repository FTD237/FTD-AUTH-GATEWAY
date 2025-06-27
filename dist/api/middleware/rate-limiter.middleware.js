"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLimiter = void 0;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("../../config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_handler_1 = require("../../utils/error-handler");
exports.apiLimiter = (0, express_rate_limit_1.default)({
    windowMs: config_1.config.app.rateLimiter.windowMs,
    limit: config_1.config.app.rateLimiter.max,
    keyGenerator: (req) => {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ,')[1];
            if (token) {
                const decoded = jsonwebtoken_1.default.verify(token, config_1.config.app.jwt.secret);
                return decoded.service;
            }
        }
        catch (error) {
            throw new error_handler_1.ApiError(401, "Unauthorized");
        }
        return req.ip || 'anonymous';
    },
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 'error',
        message: 'Too much request, please try later',
    }
});
