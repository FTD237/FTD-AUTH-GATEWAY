import { createProxyMiddleware } from 'http-proxy-middleware'
import { Request, Response } from "express";
import {config} from "../../config";
import {logger} from "../../utils/logger";

export const createAuthServiceProxy = () => {
    return createProxyMiddleware({
        target: config.proxies.authService.target,
        changeOrigin: config.proxies.authService.changeOrigin,
        pathRewrite: config.proxies.authService.pathRewrite,
        secure: config.proxies.authService.secure,

        on: {
            /**
             *
             * @param proxyReq
             * @param req
             * @param res
             */
            proxyReq: (proxyReq, req, res) => {
                const expressReq = req as unknown as Request;

                proxyReq.setHeader('X-Forwarded-From', 'API-Gateway')

                if (expressReq.body && Object.keys(expressReq.body).length > 0) {
                    const bodyData = JSON.stringify(expressReq.body)
                    proxyReq.setHeader('Content-Type', 'application/json')
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
                    proxyReq.write(bodyData)
                }
            },

            proxyRes: (proxyRes, req, res) => {
              logger.info(`Proxy response from auth service: ${proxyRes.statusCode}`)
            },

            error: (err, req, res) => {
                const expressRes = res as unknown as Response
                logger.error(`Proxy error: ${err.message}`)
                expressRes.status(500).json({
                    status: 'error',
                    message: 'Error connection to the auth service',
                })
            }

        }
    })
}