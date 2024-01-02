import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import SequelizeInstance from '../../../core/db';
import migrationBuilder from '../../../core/db/migrations';
import { createMockUser } from '../../users/tests/mocks';
import { IInvestment } from '../domain/Interface';
import { STATUS } from '../application/constants';

chai.use(chaiHttp);
chai.should();

describe('@Investment: API', () => {
  const BASE_URL = '/api/v1/investment';
  let user, token, wallet, investment;

  before(async () => {
    await SequelizeInstance().init();
    // await migrationBuilder.exec();
    
    user = await createMockUser();
    token = user.token;
    wallet = user.wallet;
  });

  describe('@Create', () => {
    it('@SUCCESS: should create a investment record', async () => {
      const props: Partial<IInvestment> = {
        WalletId: wallet.id,
        InvestmentOptId: 1,
        initialAmount: 250,
      };
      const response = await chai
        .request(app)
        .post(`${BASE_URL}`)
        .set({ Authorization: `Token ${token}` })
        .send(props);
      response.should.have.status(200);
      const { body } = response;

      expect(body).to.have.property('id');
      expect(body).to.have.property('balance');
      expect(body).to.have.property('WalletId');
      expect(body).to.have.property('InvestmentOptId');
      expect(body).to.have.property('initialAmount');

      expect(body.InvestmentOptId).to.be.equal(props.InvestmentOptId);
      expect(body.initialAmount).to.be.equal(props.initialAmount);
      expect(body.balance).to.be.equal(props.initialAmount);
      investment = body;
    });

    it('@SUCCESS: should create a investment record', async () => {
      const props: Partial<IInvestment> = {
        WalletId: wallet.id,
        InvestmentOptId: 2,
        initialAmount: 300,
      };
      const response = await chai
        .request(app)
        .post(`${BASE_URL}`)
        .set({ Authorization: `Token ${token}` })
        .send(props);
      response.should.have.status(200);
      const { body } = response;

      expect(body).to.have.property('id');
      expect(body).to.have.property('balance');
      expect(body).to.have.property('WalletId');
      expect(body).to.have.property('InvestmentOptId');
      expect(body).to.have.property('initialAmount');

      expect(body.InvestmentOptId).to.be.equal(props.InvestmentOptId);
      expect(body.initialAmount).to.be.equal(props.initialAmount);
    });
  });

  describe('@Search', () => {
    it('@SUCCESS: should get all investment by walletId', async () => {
      const props: Partial<IInvestment> = {
        WalletId: wallet.id,
      };
      const response = await chai
        .request(app)
        .post(`${BASE_URL}/search`)
        .set({ Authorization: `Token ${token}` })
        .send(props);
      response.should.have.status(200);
      const { body } = response;

      expect(body).to.be.an('array');
      expect(body).to.not.be.empty;
      const [targetA, targetB] = body;
      expect(targetA).to.have.property('InvestmentOpt.id');
      expect(targetB).to.have.property('InvestmentOpt.id');
      expect(targetA['InvestmentOpt.id']).to.be.equal(1);
      expect(targetB['InvestmentOpt.id']).to.be.equal(2);
    });
  });

  describe('@CHECK BALANCE', () => {
    it('@BALANCE: should get actual wallet balance', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/user/me')
        .set({ Authorization: `Token ${token}` });

      response.should.have.status(200);
      const { body } = response;
      const { wallets } = body;
      const [currentWallet] = wallets;
      expect(currentWallet.balance).to.be.equal(450);
    });
  });

  describe('@Liquidate', () => {
    it('@SUCCESS: should liquidate a investment by id', async () => {
      const response = await chai
        .request(app)
        .get(`${BASE_URL}/${investment.id}/liquidate`)
        .set({ Authorization: `Token ${token}` });
      response.should.have.status(200);
      const { body } = response;
      expect(body).to.have.property('status');
      expect(body).to.have.property('balance');
      expect(body.status).to.be.equal(STATUS.Retirado);
      expect(body.balance).to.be.equal(0);
    });
  });

  describe('@CHECK BALANCE', () => {
    it('@BALANCE: should get actual wallet balance', async () => {
      const response = await chai
        .request(app)
        .get('/api/v1/user/me')
        .set({ Authorization: `Token ${token}` });

      response.should.have.status(200);
      const { body } = response;
      const { wallets } = body;
      const [currentWallet] = wallets;
      expect(currentWallet.balance).to.be.equal(700);
    });
  });
});
