import { Router } from 'express';
import apiRoutes from './api';

const router = Router();

// router.use(/^\/(?!api).*/, (req, reply) => {
//   // const indexPath = path.join(process.cwd(), 'public', 'index.html');
//   // res.sendFile(indexPath);
//   reply.status(200).json({ reply: 'Ok' });
// });

router.use('/api/v1', apiRoutes);

export default router;
