import { validatePswd } from '../../../../core/helpers/bcrypt';
import UserRepository from '../../domain/Repository';
import { IUserInsert } from '../../domain/Interface';
import getToken from '../helpers/getToken';

export type LoginProps = Pick<IUserInsert, 'email'> & Pick<IUserInsert, 'password'>;

class Login {
  async validateUser(props: LoginProps) {
    const { email, password } = props;
    const user = await UserRepository.findOne({ email }, { attributes: { include: ['password'] } });
    const userPOJO = user.get({ plain: true });
    /** validatePswd returns a fatal error if the comparison of values fails. */
    validatePswd(password, userPOJO.password);
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
