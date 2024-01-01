import { Optional } from 'sequelize';
import { STATUS } from '../application/constants';

type StatusTypes = keyof typeof STATUS;

export interface IInvestment {
  id: number;
  status: StatusTypes;
  WalletId: number;
  InvestmentOptId: number;
  initialAmount: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export type InvestmentOptionalAtr = Optional<IInvestment, 'id' | 'createdAt' | 'updatedAt'>;
