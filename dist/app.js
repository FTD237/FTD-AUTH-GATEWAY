"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const config_1 = require("./config");
const auth_routes_1 = __importDefault(require("./api/routes/auth.routes"));
const logger_middleware_1 = require("./api/middleware/logger.middleware");
const rate_limiter_middleware_1 = require("./api/middleware/rate-limiter.middleware");
const error_handler_1 = require("./utils/error-handler");
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(config_1.config.app.corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(logger_middleware_1.loggerMiddleware);
app.use(rate_limiter_middleware_1.apiLimiter);
app.get("/status", (req, res) => {
    res.status(200).json({
        status: "UP",
        timestamp: new Date(),
        environment: config_1.config.app.environment,
    });
});
app.use("/", auth_routes_1.default);
app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: "Not found",
    });
});
app.use(error_handler_1.errorHandler);
exports.default = app;
