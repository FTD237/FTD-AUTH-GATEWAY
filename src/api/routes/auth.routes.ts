import {Request, Router} from 'express'
import {apiLimiter} from "../middleware/rate-limiter.middleware";
import {authenticateApp} from "../controllers/authenticate.app.controller";
import {verifyToken} from "../middleware/auth.application.middleware";
import {createAuthServiceProxy} from "../controllers/proxy.controller";

const router = Router();

interface CustomRequest extends Request {
    service?: string;
}
router.use('/api', verifyToken)

router.post('/authenticate/app', apiLimiter, authenticateApp)

router.get('/api/data', (req: CustomRequest, res) => {
    res.json({
        status: 'success',
        message: `Hello ${req.service}`,
        data: {name: "a thing"}
    })
})

router.use('/',
    createAuthServiceProxy()
)
export default router;