import { body } from 'express-validator';

import validationMiddleware from '../../../../core/middlewares/expressValidation';

export const createV = () => {
  const params = [
    body('InvestmentOptId').not().isEmpty().isInt(),
    body('WalletId').not().isEmpty().isInt(),
    body('initialAmount').not().isEmpty().isFloat({ min: 1, max: 1000 }),
  ];

  return [params, validationMiddleware];
};

export const searchV = () => {
  const params = [body('WalletId').not().isEmpty().isInt()];

  return [params, validationMiddleware];
};
