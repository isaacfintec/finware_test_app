import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'pino-http';

import './core/helpers/config';
import './core/db/migrations';

import router from './router';
import { isTestEnvironment } from './core/utils';
import globalErrorHandler from './core/helpers/globalErrorHandler';

const app = express();
app.use(logger({ level: isTestEnvironment() ? 'silent' : 'info' }));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', router);
app.use(globalErrorHandler);

// app.use(function (err: Error, _req, reply, _next) {
//   const { status, error } = evalueError(err);
//   return reply.status(status).json({ errors: [error.message] });
// });

export default app;
