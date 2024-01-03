import { Router } from 'express';
import apiRoutes from './api';
import path from 'path';

const router = Router();

router.use(/^\/(?!api).*/, (_req, reply, next) => {
  try {
    const indexPath = path.join(__dirname, '../../public', 'index.html');
    reply.sendFile(indexPath);
  } catch (error) {
    next(error);
  }
});

router.use('/api/v1', apiRoutes);

export default router;
