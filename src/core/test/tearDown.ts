import SequelizeInstance from '../db';

after(function closeTest(done) {
  SequelizeInstance()
    .close()
    .then(() => {
      done();
    });
});
