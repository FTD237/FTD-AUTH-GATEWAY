import dotenv from "dotenv";
import path from "path";
import Joi from "joi";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid("development", "production", "test")
      .required(),
    PORT: Joi.number().default(3000),
    ALLOWED_ORIGINS: Joi.string().required(),
    RATE_LIMIT: Joi.number().default(100),
    API_KEY_SOURCING: Joi.string().required(),
    API_KEY_BEOUT: Joi.string().required(),
    JWT_SECRET: Joi.string().required().min(32),
    JWT_EXPIRES: Joi.string().required(),
    GATEWAY_SECRET: Joi.string().required().min(32),
    GATEWAY_FORWARDER: Joi.string().required(),
    GATEWAY_REAL_IP: Joi.string().required(),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`);

export const appConfig = {
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
