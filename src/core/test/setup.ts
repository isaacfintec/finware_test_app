import SequelizeInstance from '../db';
import migrationBuilder from '../db/migrations';

before(function startTests(done) {
  SequelizeInstance()
    .init()
    .then(async () => {
      await migrationBuilder.exec();
      setImmediate(() => {
        done();
      });
    });
});
