import {
  Model,
  ModelStatic,
  WhereOptions,
  Attributes,
  FindOptions,
} from 'sequelize';
import { IRepository } from '../common/Interfaces';

export default class Repository<T extends Model> implements IRepository<T> {
  private model: ModelStatic<T>;

  setModel(model: ModelStatic<T>) {
    this.model = model;
  }

  async create<P extends T['_creationAttributes']>(
    args: P,
  ): Promise<T> {
    const self = this;
    if (!self.model) self.notModelError();
    const result = await self.model.create(args);
    return result;
  }

  async findById(id: number): Promise<T> {
    const self = this;
    if (!self.model) self.notModelError();
    const result = await self.model.findByPk(id);
    return result;
  }

  async update<P extends T>(id: unknown, set: Partial<P>): Promise<boolean> {
    const self = this;
    if (!self.model) self.notModelError();
    const wereOptions = { id } as WhereOptions<Attributes<T>>; // Define the search id condition for the model T
    const result = await this.model.update(set as any, { where: wereOptions });
    return result.length > 0;
  }

  async findOne(options: Partial<Attributes<T>>): Promise<T | null> {
    const self = this;
    if (!self.model) self.notModelError();
    const wereOptions = options as WhereOptions<Attributes<T>>; // Define the search id condition for the model T
    const result = await self.model.findOne({
      where: wereOptions,
    });
    return result;
  }

  async findAll(options?: FindOptions<T>): Promise<T[]> {
    const self = this;
    if (!self.model) self.notModelError();
    const result = await self.model.findAll({ ...options, raw: true });
    return result;
  }

  notModelError() {
    throw new Error('Model not set. Call setModel() before using');
  }
}
