import {Request, Router} from 'express'
import {apiLimiter} from "../middleware/rate-limiter.middleware";
import {authenticateApp} from "../controllers/authenticate.app.controller";
import {verifyToken} from "../middleware/auth.application.middleware";

const router = Router();

interface CustomRequest extends Request {
    service?: string;
}
router.use('/api', verifyToken)

router.post('/auth', apiLimiter, authenticateApp)

router.get('/api/data', (req: CustomRequest, res) => {
    res.json({
        status: 'success',
        message: `Hello ${req.service}`,
        data: {name: "a thing"}
    })
})
export default router;