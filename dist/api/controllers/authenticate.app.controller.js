"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateApp = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_config_1 = require("../../config/app.config");
const logger_1 = require("../../utils/logger");
const error_handler_1 = require("../../utils/error-handler");
const authenticateApp = (req, res) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
        res.status(401).json({
            status: "error",
            message: "API key is required",
        });
        throw new error_handler_1.ApiError(401, "Api key is required");
    }
    const validKey = Array.from(app_config_1.appConfig.apiKeys.values()).includes(apiKey);
    if (!validKey) {
        logger_1.logger.warning(`Invalid API key: ${apiKey.substring(0, 4)}***`);
        res.status(401).json({
            status: "error",
            message: "Invalid API key",
        });
    }
    const serviceName = Array.from(app_config_1.appConfig.apiKeys.entries()).find(([_, value]) => value === apiKey)?.[0];
    const now = Math.floor(Date.now() / 1000);
    const expiresAt = now + 3600;
    const token = jsonwebtoken_1.default.sign({
        service: serviceName,
        iat: now, //Issued at time
    }, app_config_1.appConfig.jwt.secret, { expiresIn: app_config_1.appConfig.jwt.expiresIn });
    res.status(200).json({
        status: "success",
        message: "Authenticated successfully",
        data: {
            token,
            expiresIn: 3600,
            expiresAt,
        },
    });
};
exports.authenticateApp = authenticateApp;
