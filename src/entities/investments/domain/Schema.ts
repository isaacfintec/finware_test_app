import { DataTypes } from 'sequelize';

import { STATUS } from '../application/constants';

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  status: {
    type: DataTypes.STRING(128),
    defaultValue: STATUS.Activo,
  },
  WalletId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  InvestmentOptId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  initialAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0.0,
  },

  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};
