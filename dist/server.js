"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./config");
const logger_1 = require("./utils/logger");
const PORT = config_1.config.app.port;
app_1.default.listen(PORT, () => {
    logger_1.logger.info(`API Gateway listening on ${PORT}`);
    logger_1.logger.info(`Environment: ${config_1.config.app.environment}`);
});
