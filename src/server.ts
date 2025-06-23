import app from "./app";
import {config} from "./config";
import {logger} from "./utils/logger";

const PORT = config.app.port

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`API Gateway listening on ${PORT}`);
    logger.info(`Environment: ${config.app.environment}`)
})