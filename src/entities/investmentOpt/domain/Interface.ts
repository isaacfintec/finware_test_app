import { Optional } from 'sequelize';
import { INDUSTRIES, TERMS, RISKS } from '../application/constants';

export type Industries = keyof typeof INDUSTRIES;
export type TermsTypes = keyof typeof TERMS;
export type Risks = keyof typeof RISKS;

export interface IInvestmentOpt {
  id: number;
  name: string;
  totalAmount: number;
  industry: Industries;
  reateOfReturn: number;
  termnType: TermsTypes;
  term: number;
  location: string;
  risk: Risks;
  createdAt: Date;
  updatedAt: Date;
}

export type InvestmentOptOptionalAtr = Optional<IInvestmentOpt, 'id' | 'createdAt' | 'updatedAt'>;

export type InvestmentOptAtr = Optional<IInvestmentOpt, 'id' | 'createdAt' | 'updatedAt'>;
