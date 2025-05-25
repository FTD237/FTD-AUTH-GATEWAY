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
                // TODO: enlever ces infos ici et les mettre en env ou config
                proxyReq.setHeader('X-Gateway-secret', '5f8a9c0d3e6b4a7f9e3d2c1b0a987654')

                proxyReq.setHeader('X-Forwarded-For', '127.0.0.1');
                proxyReq.setHeader('X-Real-IP', '127.0.0.1');

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