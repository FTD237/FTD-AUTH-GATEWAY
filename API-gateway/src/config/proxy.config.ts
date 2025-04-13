import dotenv from 'dotenv';
import path from 'path'
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
    .keys({
        AUTH_SERVICE_URL: Joi.string().uri().required(),
        NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
    })
    .unknown()

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) throw new Error(`Config validation error: ${error.message}`)

export const proxyConfig = {
    authService: {
        target: envVars.AUTH_SERVICE_URL,
        pathRewrite: {
            '^auth': '/api/auth'
        },
        changeOrigin: true,
        secure: envVars.NODE_ENV === 'production',
    }
}