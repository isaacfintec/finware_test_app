import SequelizeInstance from '../db';

before(async function initTest() {
  await SequelizeInstance().init();
});
