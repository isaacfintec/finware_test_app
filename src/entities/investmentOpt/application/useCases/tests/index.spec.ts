import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import SequelizeInstance from '../../../../../core/db';
import migrationBuilder from '../../../../../core/db/migrations';
import { InvestmentOptAtr } from '../../../domain/Interface';
import SpamUseCase from '../Spam';

chai.use(chaiHttp);

describe('@InvestmentOpt: UseCases', () => {
  before(async () => {
    await SequelizeInstance().init();
    await migrationBuilder.exec();
  });

  it('@Create Many: should create many investment options', async () => {
    const createSpam = new SpamUseCase();
    const spam: InvestmentOptAtr[] = await createSpam.exec();

    expect(spam).to.be.an('array');
    expect(spam).to.not.be.empty;
    const target = spam[0];
    expect(target).to.have.property('id');
    expect(target).to.have.property('name');
    expect(target).to.have.property('totalAmount');
    expect(target).to.have.property('industry');
    expect(target).to.have.property('term');
    expect(target).to.have.property('termnType');
    expect(target).to.have.property('reateOfReturn');
    expect(target).to.have.property('location');
    expect(target).to.have.property('risk');
    expect(target).to.have.property('createdAt');
    expect(target).to.have.property('updatedAt');
  });
});
