import { query } from 'express-validator';

import validationMiddleware from '../../../../core/middlewares/expressValidation';
import { ALL_INDUSTRIES, ALL_RISKS } from '../../application/constants';

export const searchV = () => {
  const params = [
    query('limit').optional().escape().trim().isString(),
    query('id').optional().escape().trim().isNumeric(),
    query('name').optional().escape().trim().isString(),
    query('risk')
      .optional()
      .escape()
      .trim()
      .isString()
      .custom((v) => ALL_RISKS.includes(v)),
    query('industry')
      .optional()
      .escape()
      .trim()
      .isString()
      .custom((v) => ALL_INDUSTRIES.includes(v)),
  ];

  return [params, validationMiddleware];
};
