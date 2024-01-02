import STATUS_CODES from 'http-status-codes';

import { TExpressHandler } from '../../../../core/common/Interfaces';
import FindAllUseCase from '../../application/useCases/FindAll';

const FindAllController: TExpressHandler = async (req, reply, next) => {
  try {
    const { body } = req;
    const findAllUseCase = new FindAllUseCase();
    const result = await findAllUseCase.exec(null, body);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default FindAllController;
