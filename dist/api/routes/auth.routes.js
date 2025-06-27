"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rate_limiter_middleware_1 = require("../middleware/rate-limiter.middleware");
const authenticate_app_controller_1 = require("../controllers/authenticate.app.controller");
const auth_application_middleware_1 = require("../middleware/auth.application.middleware");
const proxy_controller_1 = require("../controllers/proxy.controller");
const router = (0, express_1.Router)();
router.use('/api', auth_application_middleware_1.verifyToken, rate_limiter_middleware_1.apiLimiter);
router.post('/authenticate/app', rate_limiter_middleware_1.apiLimiter, authenticate_app_controller_1.authenticateApp);
// router.get('/health', (req: CustomRequest, res) => {
//     res.json({
//         status: 'success',
//         message: `Hello ${req.service}`,
//         data: {name: "a thing"}
//     })
// })
router.use('/api', (0, proxy_controller_1.createAuthServiceProxy)());
exports.default = router;
