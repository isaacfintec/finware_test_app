import { createCtrl, loginCtrl, userMeCtrl } from '../controllers';
import { createV } from './validators';

const createValidator = createV();

export const optionalRoutes = [
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

export const signRoutes = [
  {
    path: '/me',
    method: 'get',
    handlers: [userMeCtrl],
  },
];
