import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'pino-http';

import './core/helpers/config';

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
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', router);
app.use(globalErrorHandler);

export default app;
