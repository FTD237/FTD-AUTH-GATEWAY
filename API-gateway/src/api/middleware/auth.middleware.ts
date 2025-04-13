import { Response, NextFunction } from 'express'
import {ApiError} from "../../utils/error-handler";
import { AuthenticatedRequest } from "../../types";
import { config } from "../../config";
import {logger} from "../../utils/logger";


export const authenticateKey = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const apiKey = req.headers['x-api-key'] as string;

        if(!apiKey) throw new ApiError(401, 'Missing API key');

        const appInfo = config.apiKeys[apiKey];

        if (!appInfo) {
            logger.warn(`Invalid API key: ${apiKey.substring(0, 4)}***`);
            throw new ApiError(403, 'Invalid api key');
        }

        req.appInfo = appInfo;
        logger.info(`Authenticated request: ${appInfo.appName}`);

        next()

    } catch (error) {
        next(error)
    }
}
