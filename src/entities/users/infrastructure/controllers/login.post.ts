import STATUS_CODES from 'http-status-codes';

import { TExpressHandler } from '../../../../core/common/Interfaces';
import LoginUseCase from '../../application/useCases/Login';
import globalErrorHandler from '../../../../core/helpers/globalErrorHandler';

const LoginController: TExpressHandler = async (req, reply, next) => {
  try {
    const { body } = req;
    const loginUseCase = new LoginUseCase();
    const result = await loginUseCase.exec(body);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    globalErrorHandler(error, req, reply, next);
  }
};

export default LoginController;
