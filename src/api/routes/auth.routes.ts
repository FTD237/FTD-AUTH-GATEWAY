import { Router } from 'express'
import { authenticateKey } from "../middleware/auth.middleware";
import {validateRequest} from "../middleware/validation.middleware";
import {createAuthServiceProxy} from "../controllers/proxy.controller";

const router = Router();

router.use(
    authenticateKey,
    validateRequest,
    createAuthServiceProxy(),
)

export default router;