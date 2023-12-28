import { Model, DataTypes, CreationOptional, InferAttributes } from 'sequelize';

import SequelizeInstance from '../../../core/db/index';
import { encrypt } from '../../../core/helpers/bcrypt';
import { IUserInsert, UserOptionalAtr } from './Interface';

class User extends Model<IUserInsert, UserOptionalAtr> {
  declare id: number;
  declare username: string;
  declare email: string;
  declare postaladdress: string;
  declare password: string;
  declare birthdate: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

User.init(
  {
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
  },
  {
    sequelize: SequelizeInstance().sequelize,
    tableName: 'users',
  },
);

export default User;
