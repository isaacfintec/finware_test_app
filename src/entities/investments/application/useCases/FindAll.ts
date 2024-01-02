import InvestmentRepo from '../../domain/Repository';
import InvestmentModel from '../../domain/Model';
import { FindOptions } from 'sequelize';
import InvestmentOpt from '../../../../entities/investmentOpt/domain/Model';

const DEFAUL_LIMIT_PAGINATION = 10;
type Props = Partial<InvestmentModel>;
type QueryOptions = FindOptions<InvestmentModel>;

class FindAll {
  async doOperation(query: QueryOptions) {
    const docs = await InvestmentRepo.findAll(query);
    return docs;
  }

  composeQuery(limit: number, props?: Props) {
    const { WalletId } = props;
    if (!WalletId) return null;
    const where = {
      WalletId,
    };
    const queryOptions = {
      where,
      limit,
      include: [InvestmentOpt],
      raw: true,
    };
    return queryOptions;
  }

  async exec(limit?: number, props?: Props): Promise<InvestmentModel[]> {
    const self = this;
    const queryOptions = await self.composeQuery(limit || DEFAUL_LIMIT_PAGINATION, props);
    if (!queryOptions) return [];

    const documents = await self.doOperation(queryOptions);
    return documents;
  }
}

export default FindAll;
