import InvestmentOptRepo from '../../domain/Repository';
import { InvestmentOptionalAtr } from '../../domain/Interface';

class Create {
  async doOperation(props: InvestmentOptionalAtr): Promise<InvestmentOptionalAtr> {
    props.initialAmount = +props.initialAmount;
    props.balance = props.initialAmount;
    const doc = await InvestmentOptRepo.create<InvestmentOptionalAtr>(props);
    const docPOJO = doc.get({ plain: true });
    return docPOJO;
  }

  async exec(props: InvestmentOptionalAtr) {
    const self = this;
    const doc = await self.doOperation(props);
    return doc;
  }
}

export default Create;
