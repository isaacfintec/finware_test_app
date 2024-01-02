import { DataTypes } from 'sequelize';

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
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  reateOfReturn: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
  termnType: {
    type: DataTypes.STRING(128),
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
    type: DataTypes.STRING(128),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};
