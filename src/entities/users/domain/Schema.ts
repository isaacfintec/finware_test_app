import { DataTypes } from 'sequelize';

import { encrypt } from '../../../core/helpers/bcrypt';

export default {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  postaladdress: {
    type: new DataTypes.STRING(320),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(),
    allowNull: false,
    set: function (pswd) {
      const hashedPassword = encrypt(pswd as string);
      this.setDataValue('password', hashedPassword);
    },
  },
  birthdate: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
};
