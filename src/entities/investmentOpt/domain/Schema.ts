import { DataTypes } from 'sequelize';

import { ALL_INDUSTRIES, ALL_RISKS, ALL_TERMS } from '../application/constants';

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  industry: {
    type: DataTypes.ENUM(...ALL_INDUSTRIES),
    allowNull: false,
  },
  reateOfReturn: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  termnType: {
    type: DataTypes.ENUM(...ALL_TERMS),
    allowNull: false,
  },
  term: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  location: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  risk: {
    type: DataTypes.ENUM(...ALL_RISKS),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};
