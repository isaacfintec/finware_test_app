import { Industries, Risks, TermsTypes, InvestmentOptAtr } from '../../domain/Interface';
import { INDUSTRIES, RISKS, TERMS } from '../constants';
import Create from './Create';
import { faker } from '@faker-js/faker';

class Spam {
  async operation(spam: InvestmentOptAtr): Promise<InvestmentOptAtr> {
    try {
      const create = new Create();
      const investmentOpt = await create.exec(spam);
      return investmentOpt;
    } catch (error) {
      console.error(error.message);
      console.error(error.stack);
      return spam;
    }
  }

  async doOperation(spam: InvestmentOptAtr[]): Promise<InvestmentOptAtr[]> {
    const self = this;
    const spamPromise: InvestmentOptAtr[] = spam.map(self.operation.bind(self));
    const result = await Promise.all(spamPromise);
    return result;
  }

  getSpam() {
    const spam: InvestmentOptAtr[] = Array(10)
      .fill(null)
      .map((_v, index) => {
        const industry = sort(
          index,
          INDUSTRIES.Agricultura,
          INDUSTRIES.Energética,
          INDUSTRIES.Iformatica,
        );
        const amount = sort(index, 65000.0, 280000.0, 120000.0);
        const risk = sort(index, RISKS.Alto, RISKS.Medio, RISKS.Bajo);
        return {
          name: faker.company.name(),
          totalAmount: amount as number,
          industry: industry as Industries,
          term: 12,
          termnType: TERMS.Mensual as TermsTypes,
          reateOfReturn: 8,
          location: faker.location.streetAddress(),
          risk: risk as Risks,
        };
      });

    return spam;
  }

  async exec(): Promise<InvestmentOptAtr[]> {
    const self = this;
    const spam = await self.getSpam();
    const x = await self.doOperation(spam);
    return x;
  }
}

export default Spam;

function sort(target: number, optionA: unknown, optionB: unknown, optionC: unknown) {
  return target <= 2 ? optionA : target <= 5 ? optionB : optionC;
}
