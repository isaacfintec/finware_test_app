import STATUS_CODES from 'http-status-codes';

import { TExpressHandler } from '../../../../core/common/Interfaces';
import Liquidate from '../../application/useCases/Liquidate';

const FindAllController: TExpressHandler = async (req, reply, next) => {
  try {
    const {
      params: { id },
    } = req;
    const liquidate = new Liquidate();
    const result = await liquidate.exec(+id);
    reply.status(STATUS_CODES.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export default FindAllController;
