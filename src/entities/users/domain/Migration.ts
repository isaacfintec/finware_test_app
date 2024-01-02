import schema from './Schema';
import SequelizeInstance from '../../../core/db';
import { isTestEnvironment } from '../../../core/utils';
import Model from './Model';

const migration = {
  up: () => {
    const tableName = Model.tableName;
    const sequelize = SequelizeInstance().connect();
    const queryInterface = sequelize.getQueryInterface();
    const result = queryInterface.createTable(tableName, schema);

    console.log(`${tableName} table synchronized successfully`);
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
