import { Sequelize } from 'sequelize';
import { isTestEnvironment } from '../utils';

class SequelizeConnection {
  sequelize: any;
  connection: 1 | 0;
  private static instance: SequelizeConnection;

  private constructor() {}

  public static getInstance() {
    if (!SequelizeConnection.instance) {
      SequelizeConnection.instance = new SequelizeConnection();
    }
    return SequelizeConnection.instance;
  }

  connect() {
    const self = this;
    const testEnvironment = isTestEnvironment();
    const options = {
      logging: false,
      dialectOptions: {
        decimalNumbers: true,
      },
    };

    if (self.sequelize) return self.sequelize;
    console.log('Sequelize connection');

    if (testEnvironment) {
      self.sequelize = new Sequelize('sqlite::memory:', options);
    } else {
      self.sequelize = new Sequelize(process.env.DB_URL, options);
    }
    return self.sequelize;
  }

  async init() {
    const self = this;
    try {
      if (self.connection === 1) return self;

      console.log('Start db connection');

      self.connect();
      await self.sequelize.authenticate();
      self.connection = 1;

      console.log('DB connection has been created');
      return self;
    } catch (error) {
      const err = error as Error;
      console.error('Unable to connect with pg: ', err.message);
      throw error;
    }
  }

  async close() {
    const self = this;
    try {
      if (!self.sequelize) return false;
      await self.sequelize.close();
      self.connection = 0;
      console.log('DB connection has been closed');
    } catch (error) {
      const err = error as Error;
      console.error('Unable to close connection: ', err.message);
    }
  }
}

export default SequelizeConnection.getInstance;
