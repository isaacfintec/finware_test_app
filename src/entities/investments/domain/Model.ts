import { Model } from 'sequelize';

import SequelizeInstance from '../../../core/db/index';
import WalletModel from '../../wallet/domain/Model';
import { IInvestment, InvestmentOptionalAtr } from './Interface';
import schema from './Schema';
import InvestmentOpt from '../../investmentOpt/domain/Model';
import { CustomError } from '../../../core/helpers';
import { STATUS } from '../application/constants';

class InvestmentModel extends Model<IInvestment, InvestmentOptionalAtr> {
  declare id: number;
  declare status: string;
  declare WalletId: number;
  declare InvestmentOptId: number;
  declare initialAmount: number;
  declare balance: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  async liquidate(): Promise<InvestmentModel> {
    this.status = STATUS.Retirado;
    console.log(this.balance);
    const amount = +this.balance;
    this.balance = 0;
    const wallet = await WalletModel.findByPk(this.WalletId);
    console.log(wallet.balance);
    if (wallet) {
      wallet.balance += amount;
      await wallet.save();
    }
    await this.save();
    return this;
  }
}

InvestmentModel.init(schema, {
  sequelize: SequelizeInstance().connect(),
  tableName: 'Investments',
});

InvestmentModel.belongsTo(InvestmentOpt);

InvestmentModel.beforeCreate(async (investment, _options) => {
  const errorMessage = 'Unable to process: wallet or balance error';
  try {
    const wallet = await WalletModel.findByPk(investment.WalletId);
    if (!wallet || wallet.balance <= 0) throw new Error(errorMessage);
    wallet.balance -= investment.initialAmount;
    if (wallet.balance < 0) throw new Error(errorMessage);
    await wallet.save();
  } catch (error) {
    throw new CustomError(500, error.message);
  }
});

export default InvestmentModel;
