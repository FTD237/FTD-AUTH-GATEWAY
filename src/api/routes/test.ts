// import express from 'express';
// import { authenticateApp } from './controllers/authController';
// import { verifyToken } from './middleware/verifyToken';
// import { apiLimiter } from './middleware/rateLimiter';
//
// const router = express.Router();
//
// // Authentication endpoint - exchange API key for token
// router.post('/auth', apiLimiter, authenticateApp);
//
// // Protected routes - require a valid JWT token
// router.use('/api', verifyToken);
// router.get('/api/data', (req, res) => {
//     res.json({
//         status: 'success',
//         message: `Hello ${req.service}!`,
//         data: { /* your data */ }
//     });
// });
//
// export default router;