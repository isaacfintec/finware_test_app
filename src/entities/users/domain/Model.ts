import { Model, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin } from 'sequelize';

import schema from './Schema';
import SequelizeInstance from '../../../core/db/index';
import { IUserInsert, UserOptionalAtr } from './Interface';
import WalletModel from '../../wallet/domain/Model';

class Users extends Model<IUserInsert, UserOptionalAtr> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare postaladdress: string;
  declare password: string;
  declare birthdate: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  getWallets: HasManyGetAssociationsMixin<WalletModel>;
  createWallet: HasManyCreateAssociationMixin<WalletModel>;
}

Users.init(schema, {
  sequelize: SequelizeInstance().connect(),
  tableName: 'Users',
  defaultScope: {
    attributes: { exclude: ['password'] },
  },
});

Users.hasMany(WalletModel, { as: 'wallets' });

export default Users;
