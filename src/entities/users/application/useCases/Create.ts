import Users from '../../domain/Model';
import UserRepository from '../../domain/Repository';
import { IUser, IUserInsert } from '../../domain/Interface';

class Create {
  async doOperation(userProps: IUserInsert): Promise<IUser> {
    const user = await UserRepository.create<IUserInsert>(userProps);
    const userPOJO = user.get({ plain: true });
    delete userPOJO.password;
    return userPOJO;
  }

  async exec(userProps: IUserInsert) {
    const self = this;
    const user = await self.doOperation(userProps);
    return user;
  }
}

export default Create;
