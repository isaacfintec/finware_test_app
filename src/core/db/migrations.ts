import investmentOptMigration from '../../entities/investmentOpt/domain/Migration';
import userMigration from '../../entities/users/domain/Migration';
import walletMigration from '../../entities/wallet/domain/Migration';
import investmentMigration from '../../entities/investments/domain/Migration';

userMigration.up();
investmentOptMigration.up();
walletMigration.up();
investmentMigration.up();
