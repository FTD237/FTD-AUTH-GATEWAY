import { appConfig } from "./app.config";
import { proxyConfig } from "./proxy.config";

export const config = {
  app: appConfig,
  proxies: proxyConfig,
  apiKeys: appConfig.apiKeys,
};
