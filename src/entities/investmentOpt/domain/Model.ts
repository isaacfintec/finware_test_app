import { Model } from 'sequelize';

import SequelizeInstance from '../../../core/db/index';
import { IInvestmentOpt, InvestmentOptAtr } from './Interface';
import schema from './Schema';

class InvestmentOpt extends Model<IInvestmentOpt, InvestmentOptAtr> {
  declare id: number;
  declare name: string;
  declare totalAmount: number;
  declare industry: string;
  declare reateOfReturn: number;
  declare termnType: string;
  declare term: number;
  declare location: string;
  declare risk: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

InvestmentOpt.init(schema, {
  sequelize: SequelizeInstance().connect(),
  tableName: 'InvestmentOpt',
});

export default InvestmentOpt;
