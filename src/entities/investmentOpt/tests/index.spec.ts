import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import SequelizeInstance from '../../../core/db';
import migrationBuilder from '../../../core/db/migrations';
import { createMockUser } from '../../users/tests/mocks';

chai.use(chaiHttp);
chai.should();

describe('@InvestmentOpt: API', () => {
  const BASE_URL = '/api/v1/investmentOpt';
  let user, token;

  before(async () => {
    await SequelizeInstance().init();
    await migrationBuilder.exec();
    user = await createMockUser();
    token = user.token;
  });

  describe('@GetAll', () => {
    it('@SUCCESS: should return all investmentOptions', async () => {
      const response = await chai
        .request(app)
        .get(`${BASE_URL}?limit=10`)
        .set({ Authorization: `Token ${token}` });
      response.should.have.status(200);
      const body = response.body;
      const [target] = body;

      expect(body).to.be.an('array');
      expect(body).to.not.be.empty;
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

    it('@QUERY:SUCCESS: should return exact investmentOptions', async () => {
      const riskQuery = 'Medio';
      const industryQuery = 'Energética';
      const response = await chai
        .request(app)
        .get(`${BASE_URL}?risk=${riskQuery}&industry=${industryQuery}`)
        .set({ Authorization: `Token ${token}` });
      response.should.have.status(200);
      const body = response.body;
      const [target] = body;
      expect(target).to.have.property('industry');
      expect(target).to.have.property('risk');
      expect(target.industry).to.be.equal(industryQuery);
      expect(target.risk).to.be.equal(riskQuery);
    });

    it('@QUERY:FAIL: should return error', async () => {
      const riskQuery = 'No existente';
      const industryQuery = 'No existente';
      const response = await chai
        .request(app)
        .get(`${BASE_URL}?risk=${riskQuery}&industry=${industryQuery}`)
        .set({ Authorization: `Token ${token}` });
      response.should.have.status(400);
      const body = response.body;
      expect(body).to.have.property('errors');
      expect(body.errors).to.be.an('array');
      expect(body.errors).to.not.be.empty;
    });
  });
});
