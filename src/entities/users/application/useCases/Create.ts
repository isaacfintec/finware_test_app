import UserRepository from '../../domain/Repository';
import { IUser, IUserInsert } from '../../domain/Interface';
import { IWallet } from 'src/entities/wallet/domain/Interface';

class Create {
  async doOperation(userProps: IUserInsert): Promise<{ user: IUser; wallet: IWallet }> {
    const userDoc = await UserRepository.create<IUserInsert>(userProps);
    const wallet = await userDoc.createWallet();
    const userPOJO = userDoc.get({ plain: true });
    const walletPOJO = wallet.get({ plain: true });
    delete userPOJO.password;
    return { user: userPOJO, wallet: walletPOJO };
  }

  async exec(userProps: IUserInsert) {
    const self = this;
    const result = await self.doOperation(userProps);
    return result;
  }
}

export default Create;
