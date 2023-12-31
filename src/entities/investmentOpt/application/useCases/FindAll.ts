import InvestmentOptRepo from '../../domain/Repository';
import { InvestmentOptAtr, IInvestmentOpt } from '../../domain/Interface';
import InvestmentOptModel from '../../domain/Model';
import { FindOptions } from 'sequelize';

type Props = Partial<IInvestmentOpt>;
const DEFAUL_LIMIT_PAGINATION = 10;
type QueryOptions = FindOptions<InvestmentOptModel>;

class FindAll {
  async doOperation(query: QueryOptions) {
    const docs = await InvestmentOptRepo.findAll(query);
    return docs;
  }

  composeQuery(limit: number, props?: Props) {
    const { name, id, risk, industry } = props;
    const where = {
      ...(name ? { name } : {}),
      ...(risk ? { risk } : {}),
      ...(industry ? { industry } : {}),
      ...(id ? { id } : {}),
    };
    const queryOptions = { where, limit };
    return queryOptions;
  }

  async exec(limit?: number, props?: Props): Promise<InvestmentOptModel[]> {
    const self = this;
    const queryOptions = await self.composeQuery(limit || DEFAUL_LIMIT_PAGINATION, props);
    const documents = await self.doOperation(queryOptions);
    return documents;
  }
}

export default FindAll;
