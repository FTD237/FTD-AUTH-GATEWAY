import app from "./app";
import {config} from "./config";
import {logger} from "./utils/logger";

const PORT = config.app.port

app.listen(PORT, () => {
    logger.info(`API Gateway listening on ${PORT}`);
    logger.info(`Environnement: ${config.app.environment}`)
    logger.info(`Authentication service target: ${config.proxies.authService.target}`)
})