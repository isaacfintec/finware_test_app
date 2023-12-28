import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'pino-http';

import globalErrorshandler from './core/globalErrorHandler';
// import router from './router';
// import './core/config';

const app = express();
app.use(logger());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', (req, reply, next) => {
  req.log.info('something');
  reply.status(200).json({ reply: 'Ok' });
});

app.use((_req, res, _next) => {
  res.status(404).send('Página no encontrada');
});
app.use(globalErrorshandler);

export default app;
