import { body } from 'express-validator';

import validationMiddleware from '../../../../core/middlewares/expressValidation';

export const createV = () => {
  const params = [
    body('username').not().isEmpty().escape().trim().isString(),
    body('email').not().isEmpty().trim().isEmail(),
    body('postaladdress').not().isEmpty().escape().trim().isString(),
    body('birthdate')
      .not()
      .isEmpty()
      .escape()
      .trim()
      .isString()
      .matches(/^\d{2}-\d{2}-\d{4}$/)
      .withMessage('The date format should be DD/MM/YYYY'),
  ];

  return [params, validationMiddleware];
};
