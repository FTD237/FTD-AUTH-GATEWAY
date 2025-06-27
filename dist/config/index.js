"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const app_config_1 = require("./app.config");
const proxy_config_1 = require("./proxy.config");
exports.config = {
    app: app_config_1.appConfig,
    proxies: proxy_config_1.proxyConfig,
    apiKeys: app_config_1.appConfig.apiKeys,
};
