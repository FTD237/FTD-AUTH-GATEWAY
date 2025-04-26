import {Request, RequestHandler, Response} from "express";
import jwt from "jsonwebtoken";
import { appConfig } from "../../config/app.config";

export const authenticateApp = (req: Request, res: Response) => {
    const apiKey = req.headers['x-api-key'] as string;

    if (!apiKey) {
        res.status(401).json({
            status: 'error',
            message: 'API key is required'
        })
    }

    const validKey = Array.from(appConfig.apiKeys.values()).includes(apiKey)

    if (!validKey) {
        res.status(401).json({
            status: 'error',
            message: 'Invalid API key'
        })
    }

    const serviceName = Array.from(appConfig.apiKeys.entries())
        .find(([_, value]) => value === apiKey)?.[0];

    const now = Math.floor(Date.now() / 1000);

    const expiresAt = now + 3600

    const token = jwt.sign(
        {
            service: serviceName,
            iat: now, //Issued at time
        },
        appConfig.jwt.secret,
        { expiresIn: appConfig.jwt.expiresIn }
    )

    res.status(200).json({
        status: 'success',
        message: "Authenticated successfully",
        data: {
            token,
            expiresIn: 3600,
            expiresAt
        }
    })
}

