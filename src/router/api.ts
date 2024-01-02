import { Router } from 'express';

import userRoutes from '../entities/users/infrastructure/router';
import investmentOptRoutes from '../entities/investmentOpt/infrastructure/router';
import auth from '../core/middlewares/auth';
import investmentRoutes from '../entities/investments/infrastructure/router';

const router = Router();

router.use('/auth', userRoutes.optional);
router.use('/user', auth.required, userRoutes.sing);
router.use('/investmentOpt', auth.required, investmentOptRoutes);
router.use('/investment', auth.required, investmentRoutes);

export default router;
