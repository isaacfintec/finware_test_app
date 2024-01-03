import { expect } from 'chai';
import SequelizeInstance from '.';
import migrationBuilder from './migrations';

describe('@Sequelize', () => {
  before(async () => {
    await SequelizeInstance().init();
    await migrationBuilder.exec();
  });

  it('@Sequelize:Connection: should create a test connection', async () => {
    const connection = SequelizeInstance().connection;
    expect(connection).to.be.equal(1);
  });
});
