import { createCtrl, loginCtrl, userMeCtrl } from '../controllers';
import userExistMiddleware from '../middlewares/userExist';
import { createV } from './validators';

const createValidator = createV();

export const optionalRoutes = [
  {
    path: '/signup',
    method: 'post',
    handlers: [createValidator, userExistMiddleware, createCtrl],
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
