import UserRepository from '../../domain/Repository';
import { IUser } from '../../domain/Interface';
import { IWallet } from 'src/entities/wallet/domain/Interface';

class FindByPk {
  async doOperation(id: number): Promise<{ user: IUser; wallets: IWallet[] }> {
    const userDoc = await UserRepository.findById(id);
    const wallets = await userDoc.getWallets();
    const userPOJO = userDoc.get({ plain: true });
    const walletsPOJO = wallets.map((w) => w.get({ plain: true }));
    delete userPOJO.password;
    return { user: userPOJO, wallets: walletsPOJO };
  }

  async exec(id: number) {
    const self = this;
    const result = await self.doOperation(id);
    return result;
  }
}

export default FindByPk;
