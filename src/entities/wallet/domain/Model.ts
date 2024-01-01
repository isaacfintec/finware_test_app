import { HasManyGetAssociationsMixin, Model } from 'sequelize';

import SequelizeInstance from '../../../core/db/index';
import { IWallet, WalletOptionalAtr } from './Interface';
import schema from './Schema';
import InvestmentModel from '../../investments/domain/Model';

class Wallet extends Model<IWallet, WalletOptionalAtr> {
  declare id: number;
  declare UserId: number;
  declare balance: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  getInvestments: HasManyGetAssociationsMixin<Wallet>;
}

Wallet.init(schema, {
  sequelize: SequelizeInstance().connect(),
  tableName: 'Wallet',
});

Wallet.hasMany(InvestmentModel, { as: 'investments' });

export default Wallet;
