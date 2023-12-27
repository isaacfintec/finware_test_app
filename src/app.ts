import path from 'path';
import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import globalErrorshandler from './core/globalErrorHandler';

// import './core/config';
// import './core/db';

// import router from './router';

const app = express();
app.use(logger('combined'));
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), 'public')));
// app.use('/', router);

app.use((_req, res, _next) => {
  res.status(404).send('Página no encontrada');
});
app.use(globalErrorshandler);

export default app;
