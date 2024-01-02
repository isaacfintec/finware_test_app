import { createCtrl, findAllCtrl, liquidateCtrl } from '../controllers';
import isValidUserMiddleware from '../middlewares/isValidUser';
import { createV, searchV } from './validators';

const createValidator = createV();
const searchValidator = searchV();

const routes = [
  {
    path: '/',
    method: 'post',
    handlers: [createValidator, createCtrl],
  },
  {
    path: '/search',
    method: 'post',
    handlers: [searchValidator, findAllCtrl],
  },
  {
    path: '/:id/liquidate',
    method: 'get',
    handlers: [isValidUserMiddleware, liquidateCtrl],
  },
];

export default routes;
