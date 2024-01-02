import STATUS_CODES from 'http-status-codes';

import { TExpressHandler } from '../../../../core/common/Interfaces';
import FindByPkUseCase from '../../application/useCases/FindByPk';

const LoginController: TExpressHandler = async (req, reply, next) => {
  try {
    const payload = req.auth;
    const findByPkUseCase = new FindByPkUseCase();
    const result = await findByPkUseCase.exec(payload.user);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default LoginController;
