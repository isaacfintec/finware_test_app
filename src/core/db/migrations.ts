import investmentOptMigration from '../../entities/investmentOpt/domain/Migration';
import userMigration from '../../entities/users/domain/Migration';
import walletMigration from '../../entities/wallet/domain/Migration';
import investmentMigration from '../../entities/investments/domain/Migration';

type Migration = { up: () => Promise<void>; down: () => Promise<void> };

class MigrationBuilder {
  operations: Migration[] = [];

  syncTable(migration: Migration) {
    const self = this;
    self.operations.push(migration);
    return self;
  }

  async exec() {
    const self = this;
    for (const op of self.operations) {
      await op.up();
    }
    return self;
  }
}

const migrationBuilder = new MigrationBuilder();
migrationBuilder.syncTable(userMigration);
migrationBuilder.syncTable(investmentOptMigration);
migrationBuilder.syncTable(investmentMigration);
migrationBuilder.syncTable(walletMigration);

export default migrationBuilder;
