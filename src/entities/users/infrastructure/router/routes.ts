import globalErrorHandler from '../../../../core/helpers/globalErrorHandler';
import { createCtrl, loginCtrl } from '../controllers';
import { createV } from './validators';

const createValidator = createV();

const routes = [
  {
    path: '/singup',
    method: 'post',
    handlers: [createValidator, createCtrl],
  },
  {
    path: '/login',
    method: 'post',
    handlers: [loginCtrl],
  },
];

export default routes;
