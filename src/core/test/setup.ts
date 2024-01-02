import SequelizeInstance from '../db';

before(function startTests(done) {
  SequelizeInstance()
    .init()
    .then(async () => {
      done();
    });
});
