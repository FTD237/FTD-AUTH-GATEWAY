"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAuthServiceProxy = void 0;
const http_proxy_middleware_1 = require("http-proxy-middleware");
const config_1 = require("../../config");
const logger_1 = require("../../utils/logger");
const createAuthServiceProxy = () => {
    return (0, http_proxy_middleware_1.createProxyMiddleware)({
        target: config_1.config.proxies.authService.target,
        changeOrigin: config_1.config.proxies.authService.changeOrigin,
        pathRewrite: config_1.config.proxies.authService.pathRewrite,
        secure: config_1.config.proxies.authService.secure,
        on: {
            /**
             *
             * @param proxyReq
             * @param req
             * @param res
             */
            proxyReq: (proxyReq, req, res) => {
                const expressReq = req;
                proxyReq.setHeader('X-Gateway-secret', config_1.config.app.gateways.secret);
                proxyReq.setHeader('X-Forwarded-For', config_1.config.app.gateways.forwarder);
                proxyReq.setHeader('X-Real-IP', config_1.config.app.gateways.ip);
                if (expressReq.body && Object.keys(expressReq.body).length > 0) {
                    const bodyData = JSON.stringify(expressReq.body);
                    proxyReq.setHeader('Content-Type', 'application/json');
                    proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
                    proxyReq.write(bodyData);
                }
            },
            proxyRes: (proxyRes, req, res) => {
                logger_1.logger.info(`Proxy response from auth service: ${proxyRes.statusCode}`);
            },
            error: (err, req, res) => {
                const expressRes = res;
                logger_1.logger.error(`Proxy error: ${err.message}`);
                expressRes.status(500).json({
                    status: 'error',
                    message: 'Error connection to the auth service',
                });
            }
        }
    });
};
exports.createAuthServiceProxy = createAuthServiceProxy;
