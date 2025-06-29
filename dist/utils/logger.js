"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const app_config_1 = require("../config/app.config");
const levels = {
    error: 0,
    warning: 1,
    info: 2,
    http: 3,
    debug: 4,
};
const level = () => {
    const env = app_config_1.appConfig.environment || "development";
    return env === "development" ? "debug" : "warn";
};
const format = winston_1.default.format.combine(winston_1.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.default.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`));
const transports = [
    new winston_1.default.transports.Console(),
    new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston_1.default.transports.File({ filename: "logs/all.log" }),
];
exports.logger = winston_1.default.createLogger({
    level: level(),
    levels,
    format,
    transports,
});
