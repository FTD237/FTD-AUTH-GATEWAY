"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.ApiError = void 0;
const logger_1 = require("./logger");
const app_config_1 = require("../config/app.config");
class ApiError extends Error {
    constructor(statusCode, message, isOperational = true, stack) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.ApiError = ApiError;
const errorHandler = (err, req, res, next) => {
    logger_1.logger.error(`${req.method} ${req.url} ${err.message}`);
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
        return;
    }
    res.status(500).json({
        status: "error",
        message: app_config_1.appConfig.environment === "development"
            ? err.message
            : "Internal server error",
    });
};
exports.errorHandler = errorHandler;
