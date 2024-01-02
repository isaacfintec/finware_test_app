import { Model, ModelStatic, FindOptions } from 'sequelize';
import { Request, Response, NextFunction } from 'express';

export interface IRepository<T extends Model> {
  setModel(_model: ModelStatic<T>): void;
  create<P>(_data: P): Promise<T>;
  findById(_id: number): Promise<T | null>;
  update(_id: number, _data: Partial<T>): Promise<boolean>;
  findAll(_options?: FindOptions): Promise<any[]>;
}

interface IAuth {
  auth: {
    user: number;
    iat: number;
    exp: number;
  };
}

export type RequesAuth = IAuth & Request;

export type TExpressHandler = (_req: RequesAuth, _reply: Response, _next: NextFunction) => void;
