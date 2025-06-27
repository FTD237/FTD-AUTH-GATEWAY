"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
const envVarsSchema = joi_1.default.object()
    .keys({
    NODE_ENV: joi_1.default.string()
        .valid("development", "production", "test")
        .required(),
    PORT: joi_1.default.number().default(3000),
    ALLOWED_ORIGINS: joi_1.default.string().required(),
    RATE_LIMIT: joi_1.default.number().default(100),
    API_KEY_SOURCING: joi_1.default.string().required(),
    API_KEY_BEOUT: joi_1.default.string().required(),
    JWT_SECRET: joi_1.default.string().required().min(32),
    JWT_EXPIRES: joi_1.default.string().required(),
    GATEWAY_SECRET: joi_1.default.string().required().min(32),
    GATEWAY_FORWARDER: joi_1.default.string().required(),
    GATEWAY_REAL_IP: joi_1.default.string().required(),
})
    .unknown();
const { value: envVars, error } = envVarsSchema.validate(process.env);
if (error)
    throw new Error(`Config validation error: ${error.message}`);
exports.appConfig = {
    port: envVars.PORT,
    environment: envVars.NODE_ENV,
    corsOptions: {
        origin: envVars.ALLOWED_ORIGINS.split(","),
        method: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization", "X-API-KEY"],
    },
    rateLimiter: {
        windowMs: 15 * 60 * 1000,
        max: envVars.RATE_LIMIT,
    },
    apiKeys: new Map([
        ["sourcing", envVars.API_KEY_SOURCING],
        ["beOut", envVars.API_KEY_BEOUT],
    ]),
    jwt: {
        secret: envVars.JWT_SECRET,
        expiresIn: envVars.JWT_EXPIRES,
    },
    gateways: {
        secret: envVars.GATEWAY_SECRET,
        forwarder: envVars.GATEWAY_FORWARDER,
        ip: envVars.GATEWAY_REAL_IP,
    },
};
