import { Router } from 'express';

import userRoutes from '../entities/users/infrastructure/router';

const router = Router();

router.use('/user', userRoutes);
// const authMiddleware = new AuthMiddleware();

// router.use('/wallet', authMiddleware.required(), walletRoutes);

export default router;
