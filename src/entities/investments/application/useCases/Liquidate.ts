import InvestmentRepo from '../../domain/Repository';
import { IInvestment } from '../../domain/Interface';

class Liquidate {
  async doOperation(id: number): Promise<IInvestment | null> {
    const doc = await InvestmentRepo.findById(id);
    if (!doc) return null;
    const result = await doc.liquidate();
    return result.get({ plain: true });
  }

  async exec(id: number): Promise<IInvestment> {
    const self = this;
    const documents = await self.doOperation(id);
    return documents;
  }
}

export default Liquidate;
