import { expect } from 'chai';
import SequelizeInstance from './index';

describe('@Sequelize', () => {
  before(async () => {
    await SequelizeInstance().init();
  });

  after(async () => {
    await SequelizeInstance().close();
  });

  it('@Sequelize:Connection: should create a test connection', async () => {
    const connection = SequelizeInstance().connection;
    expect(connection).to.be.equal(1);
  });
});
