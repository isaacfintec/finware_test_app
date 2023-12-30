import HTTP_CODE from 'http-status-codes';
import { validationResult } from 'express-validator';

import { TExpressHandler } from '../common/Interfaces';

const validationMiddleware: TExpressHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HTTP_CODE.BAD_REQUEST).json({ errors: errors.array() });
  }
  return next();
};

export default validationMiddleware;
