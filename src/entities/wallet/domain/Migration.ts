import schema from './Schema';
import SequelizeInstance from '../../../core/db';
import { isTestEnvironment } from '../../../core/utils';
import Model from './Model';

const migration = {
  up: async () => {
    const tableName = Model.tableName;
    const sequelize = SequelizeInstance().connect();
    const queryInterface = sequelize.getQueryInterface();
    const result = await queryInterface.createTable(tableName, schema);

    console.log(`${tableName} table synchronized successfully`);
    return result;
  },

  down: () => {
    const sequelize = SequelizeInstance().connect();
    const queryInterface = sequelize.getQueryInterface();
    if (isTestEnvironment()) {
      return queryInterface.dropTable(Model.tableName);
    }
  },
};

export default migration;
