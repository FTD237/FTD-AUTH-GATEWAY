"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.proxyConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const joi_1 = __importDefault(require("joi"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, "../../.env") });
const envVarsSchema = joi_1.default.object()
    .keys({
    AUTH_SERVICE_URL: joi_1.default.string().uri().required(),
    NODE_ENV: joi_1.default.string()
        .valid("development", "production", "test")
        .required(),
})
    .unknown();
const { value: envVars, error } = envVarsSchema.validate(process.env);
if (error)
    throw new Error(`Config validation error: ${error.message}`);
exports.proxyConfig = {
    authService: {
        target: envVars.AUTH_SERVICE_URL,
        pathRewrite: {
            "^/auth": '/api/auth'
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === "production",
    },
};
