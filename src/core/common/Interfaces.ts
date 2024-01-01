import { Model, ModelStatic, FindOptions } from 'sequelize';
import { Request, Response, NextFunction } from 'express';

export interface IRepository<T extends Model> {
  setModel(model: ModelStatic<T>): void;
  create<P>(data: P): Promise<T>;
  findById(id: number): Promise<T | null>;
  update(id: number, data: Partial<T>): Promise<boolean>;
  findAll(options?: FindOptions): Promise<any[]>;
}

interface IAuth {
  auth: {
    user: number;
    iat: number;
    exp: number;
  };
}

export type RequesAuth = IAuth & Request;

export type TExpressHandler = (req: RequesAuth, reply: Response, next: NextFunction) => void;
