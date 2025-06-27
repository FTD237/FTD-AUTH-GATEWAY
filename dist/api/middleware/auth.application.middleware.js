"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../../config/app.config");
const logger_1 = require("../../utils/logger");
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        res.status(401).json({
            status: 'error',
            message: 'Access token is required'
        });
        logger_1.logger.warning(`Access token is required`);
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, app_config_1.appConfig.jwt.secret);
        req.service = decoded.service;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            res.status(401).json({
                status: 'error',
                message: 'Token has expired',
                code: 'TOKEN_EXPIRED'
            });
            logger_1.logger.warning(`Token has expired`);
        }
        res.status(403).json({
            status: 'error',
            message: 'Invalid token',
            code: 'INVALID_TOKEN'
        });
        logger_1.logger.warning(`Invalid token`);
    }
};
exports.verifyToken = verifyToken;
