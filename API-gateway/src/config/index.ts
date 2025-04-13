import { appConfig } from './app.config';
import { proxyConfig } from './proxy.config';

export const apiKeys = {
    // clés API pour les applications autorisées
    //TODO: les stockées dans une base de données
    'Sourcing-web': { appName: 'Sourcing', permissions: ['read', 'write'] },
    'BeOut-web' : { appName: 'BeOut-app', permissions: ['read', 'write'] },
    'BeOut-mobile': { appName: 'BeOut-mobile', permissions: ['read', 'write'] },
}

export const config = {
    app: appConfig,
    proxies: proxyConfig,
    apiKeys
}