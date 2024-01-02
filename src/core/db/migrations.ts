import investmentOptMigration from '../../entities/investmentOpt/domain/Migration';
import userMigration from '../../entities/users/domain/Migration';
import walletMigration from '../../entities/wallet/domain/Migration';
import investmentMigration from '../../entities/investments/domain/Migration';

type Migration = { up: () => Promise<void>; down: () => Promise<void> };

class MigrationBuilder {
  operations: Migration[] = [];
  sync: boolean = false;
  private static intance: MigrationBuilder;

  private constructor() {}

  static getInstance() {
    if (!MigrationBuilder.intance) {
      MigrationBuilder.intance = new MigrationBuilder();
    }
    return MigrationBuilder.intance;
  }

  syncTable(migration: Migration) {
    const self = this;
    self.operations.push(migration);
    return self;
  }

  async exec() {
    const self = this;
    if (self.sync) return self;
    const opsPromise = self.operations.map((op) => op.up());
    await Promise.allSettled(opsPromise);
    self.sync = true;
    return self;
  }
}

const migrationBuilder = MigrationBuilder.getInstance();
migrationBuilder.syncTable(userMigration);
migrationBuilder.syncTable(investmentOptMigration);
migrationBuilder.syncTable(investmentMigration);
migrationBuilder.syncTable(walletMigration);

export default migrationBuilder;
