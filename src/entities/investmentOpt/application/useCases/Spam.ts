import InvestmentsOptModel from '../../domain/Model';
import { Industries, Risks, TermsTypes, InvestmentOptAtr } from '../../domain/Interface';
import { INDUSTRIES, RISKS, TERMS } from '../constants';
import Create from './Create';

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
    const spam: InvestmentOptAtr[] = [
      {
        name: 'Oportunidad 1',
        totalAmount: 50000.0,
        industry: INDUSTRIES.Agricultura as Industries,
        term: 12,
        termnType: TERMS.Mensual as TermsTypes,
        reateOfReturn: 8,
        location: 'Guadalajara, Jal, Mex.',
        risk: RISKS.Alto as Risks,
      },
      {
        name: 'Oportunidad 2',
        totalAmount: 200000.0,
        industry: INDUSTRIES.Energética as Industries,
        term: 12,
        termnType: TERMS.Mensual as TermsTypes,
        reateOfReturn: 8,
        location: 'Ciudad de México, CDMX, Mex.',
        risk: RISKS.Medio as Risks,
      },
      {
        name: 'Oportunidad 3',
        totalAmount: 120000.0,
        industry: INDUSTRIES.Iformatica as Industries,
        term: 12,
        termnType: TERMS.Mensual as TermsTypes,
        reateOfReturn: 8,
        location: 'Los Angeles, Cal, USA',
        risk: RISKS.Bajo as Risks,
      },
    ];
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
