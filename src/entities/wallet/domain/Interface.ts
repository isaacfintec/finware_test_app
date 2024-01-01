import { Optional } from 'sequelize';

export interface IWallet {
  id: number;
  UserId: number;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}

export type WalletOptionalAtr = Optional<IWallet, 'id' | 'createdAt' | 'updatedAt'>;
