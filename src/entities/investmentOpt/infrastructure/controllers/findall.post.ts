import STATUS_CODES from 'http-status-codes';

import { TExpressHandler } from '../../../../core/common/Interfaces';
import FindAllUseCase from '../../application/useCases/FindAll';

const FindAllController: TExpressHandler = async (req, reply, next) => {
  try {
    const { limit, ...queryParams } = req.query;
    const findAllUseCase = new FindAllUseCase();
    const result = await findAllUseCase.exec(limit && +limit, queryParams);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default FindAllController;
