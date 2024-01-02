import { validatePswd } from '../../../../core/helpers/bcrypt';
import { CustomError } from '../../../../core/helpers';
import UserRepository from '../../domain/Repository';
import { IUserInsert } from '../../domain/Interface';
import getToken from '../helpers/getToken';

export type LoginProps = Pick<IUserInsert, 'email'> & Pick<IUserInsert, 'password'>;

class Login {
  async validateUser(props: LoginProps) {
    const { email, password } = props;
    const user = await UserRepository.findOne({
      where: { email },
      attributes: { include: ['password'] },
      raw: true,
    });
    if (!user) throw new CustomError(400, 'Unable to process: credentials error or not found');
    /** validatePswd returns a fatal error if the comparison of values fails. */
    validatePswd(password, user.password);
    return user;
  }

  async exec(props: LoginProps): Promise<{ token: string }> {
    const self = this;
    const user = await self.validateUser(props);
    const token = await getToken('user', user.id);
    return { token };
  }
}

export default Login;
