import SequelizeInstance from '../db';

after(function closeTest(done) {
  SequelizeInstance().close().then(() => {
    const connection = SequelizeInstance().connection;
    console.log('DB connection has been closed whit status ' + connection);
    done();
  });
});
