import { autoInjectable } from 'tsyringe';
import UserModel from './Model';

@autoInjectable()
export default class Repository {
  constructor(private model: UserModel) {}
  create<P>(args: P) {
    const self = this;
    const result = self.model.create();
  }
}
