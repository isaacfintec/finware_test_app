import InvestmentOptRepo from '../../domain/Repository';
import { InvestmentOptAtr } from '../../domain/Interface';

class Create {
  async doOperation(props: InvestmentOptAtr): Promise<InvestmentOptAtr> {
    const doc = await InvestmentOptRepo.create<InvestmentOptAtr>(props);
    const docPOJO = doc.get({ plain: true });
    return docPOJO;
  }

  async exec(props: InvestmentOptAtr) {
    const self = this;
    const doc = await self.doOperation(props);
    return doc;
  }
}

export default Create;
