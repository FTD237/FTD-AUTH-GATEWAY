"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerMiddleware = void 0;
const logger_1 = require("../../utils/logger");
const loggerMiddleware = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const message = `${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`;
        if (res.statusCode >= 500) {
            logger_1.logger.error(message);
        }
        else if (res.statusCode >= 400) {
            logger_1.logger.warning(message);
        }
        else {
            logger_1.logger.info(message);
        }
    });
    next();
};
exports.loggerMiddleware = loggerMiddleware;
