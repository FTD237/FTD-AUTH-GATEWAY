import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../../types";
import {ApiError} from "../../utils/error-handler";

export const validateRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        /**
         * @todo this part should verify the permission depends on the road
         *
         * @description this code is for test conditions and will change sooner
         */
        if (req.path.includes('/sourcing') && !req.appInfo?.permissions.includes('sourcing')) {
            throw new ApiError(403, 'Insufficient permissions');
        }

        if (req.method === 'POST' || req.method === 'PUT') {
            if (!req.body || Object.keys(req.body).length === 0) throw new ApiError(400, 'Request Bodyless of empty body');

            if (req.path.includes('/login')) {
                if (!req.body.username || !req.body.password) throw new ApiError(400, 'Username and password are required');
            }

            if (req.path.includes('/register')) {
                if (!req.body.username || !req.body.password || !req.body.email) throw new ApiError(400, 'Username and password are required');
            }
            next()
        }
    }catch (error) {
        next(error);
    }

}