import { SignJWT } from 'jose';
import { validatePswd } from '../../../../core/helpers/bcrypt';
import UserRepository from '../../domain/Repository';
import { IUserInsert } from '../../domain/Interface';

export type LoginProps = Pick<IUserInsert, 'email'> & Pick<IUserInsert, 'password'>;

class Login {
  async validateUser(props: LoginProps) {
    const repository = new UserRepository();
    const { email, password } = props;
    const user = await repository.findOne({ email });
    /** validatePswd returns a fatal error if the comparison of values fails. */
    validatePswd(password, user.password);
    return user;
  }

  async getToken(userId: number): Promise<string> {
    const { JWT_KEY } = process.env;
    const secret = new TextEncoder().encode(JWT_KEY);
    const token = await new SignJWT({
      user: userId,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('4hrs')
      .sign(secret);
    return token;
  }

  async exec(props: LoginProps): Promise<string> {
    const self = this;
    const user = await self.validateUser(props);
    const token = await self.getToken(user.id);
    return token;
  }
}

export default Login;
