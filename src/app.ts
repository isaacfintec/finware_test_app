import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import logger from 'pino-http';
import './core/helpers/config';

import globalErrorshandler from './core/helpers/globalErrorHandler';
import router from './router';
import './core/db/migrations';

const app = express();
// app.use(logger());
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', router);
app.use(globalErrorshandler);

export default app;
