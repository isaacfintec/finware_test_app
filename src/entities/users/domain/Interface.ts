import { Optional } from 'sequelize';

export interface IUser {
  id: number;
  username: string;
  email: string;
  postaladdress: string;
  birthdate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInsert extends IUser {
  password: string;
}

export type UserOptionalAtr = Optional<IUserInsert, 'id'>;
