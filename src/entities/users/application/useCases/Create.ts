import { SignJWT } from 'jose';
// import UserModel from '@/core/entities/users/domain/Model';
// import { CustomError } from '@core/helpers/customErrors';
// import { IUserDoc } from '../../domain/Interface';
import { validatePswd } from '../../../../core/helpers/bcrypt';

export type LoginProps = { email: string; password: string };

class Login {
  async getUser(props: LoginProps) {
    const { email, password } = props;
    // const user: IUserDoc | null = await UserModel.findOne({ email }).select('+password').lean();
    // if (!user) throw new CustomError(400, 'Invalid credentials');
    const user = { password: '', sid: '1234' };

    validatePswd(password, password);
    return user;
  }

  async getToken(userId: string): Promise<string> {
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
    const user = await self.getUser(props);
    const token = await self.getToken(user.sid);
    return token;
  }
}

export default Login;
