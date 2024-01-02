import schema from './Schema';
import SequelizeInstance from '../../../core/db';
import { isTestEnvironment } from '../../../core/utils';
import Model from './Model';
import Spam from '../application/useCases/Spam';

const migration = {
  up: async () => {
    const tableName = Model.tableName;
    const sequelize = SequelizeInstance().connect();
    const queryInterface = sequelize.getQueryInterface();
    const result = queryInterface.createTable(tableName, schema);
    const spamHandler = new Spam();
    const spam = spamHandler.getSpam();

    console.log(`${tableName} table synchronized successfully`);

    await queryInterface.bulkInsert(tableName, spam, {});
    return result;
  },

  down: (queryInterface) => {
    /** DON'T use in production mode */
    if (isTestEnvironment()) {
      return queryInterface.dropTable(Model.tableName);
    }
  },
};

export default migration;
