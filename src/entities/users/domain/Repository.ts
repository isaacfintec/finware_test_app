import { injectable } from 'tsyringe';

@injectable()
export default class Repository {
  constructor(private model: Model) {}
  create() {}
}
