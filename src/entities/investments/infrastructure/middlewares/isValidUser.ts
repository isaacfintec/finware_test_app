import { TExpressHandler } from '../../../../core/common/Interfaces';
import UserMe from '../../../users/application/useCases/FindByPk';
import FindAll from '../../application/useCases/FindAll';
import { CustomError } from '../../../../core/helpers';
import globalErrorHandler from '../../../../core/helpers/globalErrorHandler';
import { Attributes } from 'sequelize';

const isValidUserMiddleware: TExpressHandler = async (req, reply, next) => {
  const errorMessage = 'Unable to process: access denied';
  const userMe = new UserMe();
  const findAllInvestments = new FindAll();

  try {
    let isValid = false;
    const { params, auth } = req;

    const { wallets } = await userMe.exec(auth.user);
    const [wallet] = wallets;
    const investments = await findAllInvestments.exec(null, { WalletId: wallet.id });
    if (!investments.length) throw new CustomError(401, errorMessage);
    investments.map((i) => {
      if (i.id === +params.id) isValid = true;
    });
    if (!isValid) throw new CustomError(401, errorMessage);
    return next();
  } catch (error) {
    globalErrorHandler(error, req, reply, next);
  }
};

export default isValidUserMiddleware;
