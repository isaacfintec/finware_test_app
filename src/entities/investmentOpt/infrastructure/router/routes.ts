import { findAllCtrl } from '../controllers';
import { searchV } from './validators';

const searchValidator = searchV();

const routes = [
  {
    path: '/',
    method: 'get',
    handlers: [searchValidator, findAllCtrl],
  },
];

export default routes;
