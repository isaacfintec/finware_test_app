import { TExpressHandler } from '../../../../core/common/Interfaces';
import { CustomError } from '../../../../core/helpers';
import UserRepository from '../../domain/Repository';

const userExistMiddleware: TExpressHandler = async (req, reply, next) => {
  const errorMessage = 'Unable to process: invalid email';

  try {
    const { body } = req;
    const user = await UserRepository.findOne({ where: { email: body.email as string } });
    if (user) throw new CustomError(400, errorMessage);
    return next();
  } catch (error) {
    next(error);
  }
};

export default userExistMiddleware;
