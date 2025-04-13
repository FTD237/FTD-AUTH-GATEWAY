import winston from "winston";
import { appConfig } from "../config/app.config";

const levels = {
    error: 0,
    warning: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = appConfig.environment || "development";
    return env === "development" ? "debug" : "warn";
}

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/all.log' })
]

export const logger = winston.createLogger({
    level: level(),
    levels,
    format,
    transports
})