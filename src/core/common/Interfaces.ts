import { Model, ModelStatic, FindOptions } from 'sequelize';
import { Request, Response, NextFunction } from 'express';

export interface IRepository<T extends Model> {
  setModel(model: ModelStatic<T>): void;
  create<P>(data: P): Promise<T>;
  findById(id: number): Promise<T | null>;
  update(id: number, data: Partial<T>): Promise<boolean>;
  findAll(options?: FindOptions): Promise<any[]>;
}

export type TExpressHandler = (req: Request, reply: Response, next: NextFunction) => void;
