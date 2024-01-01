import { DataTypes } from 'sequelize';

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 1000.0,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};
