import { Router } from 'express';

import userRoutes from '../entities/users/infrastructure/router';
import investmentOptRoutes from '../entities/investmentOpt/infrastructure/router';
import auth from '../core/middlewares/auth';

const router = Router();

router.use('/user', userRoutes);
router.use('/investmentOpt', auth.required, investmentOptRoutes);
// const authMiddleware = new AuthMiddleware();

// router.use('/wallet', authMiddleware.required(), walletRoutes);

export default router;
