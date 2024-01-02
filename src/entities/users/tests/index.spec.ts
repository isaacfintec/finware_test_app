import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import SequelizeInstance from '../../../core/db/index';
import { failMock, getUserMock } from './mocks';

chai.use(chaiHttp);
chai.should();

describe('@Users: API', () => {
  const BASE_URL = '/api/v1/';
  const userMock = getUserMock();
  before(async () => {
    await SequelizeInstance().init();
  });

  describe('@Create', () => {
    it('@SUCCESS: should create new user', async () => {
      const response = await chai.request(app).post(`${BASE_URL}/auth/signup`).send(userMock);
      response.should.have.status(200);
      const { body } = response;
      const { user, wallet } = body;
      expect(user).to.have.property('username');
      expect(user).to.have.property('email');
      expect(user).to.have.property('postaladdress');
      expect(user).to.have.property('birthdate');
      expect(user).not.have.property('password');

      expect(user.username).to.be.equal(userMock.username);
      expect(user.email).to.be.equal(userMock.email);
      expect(user.postaladdress).to.be.equal(userMock.postaladdress);
      expect(user.birthdate).to.be.equal(userMock.birthdate);

      expect(wallet).to.have.property('balance');
      expect(wallet).to.have.property('UserId');

      expect(wallet.balance).to.be.equal(1000);
      expect(wallet.UserId).to.be.equal(user.id);
    });

    it('@FAIL: not email', async () => {
      const response = await chai.request(app).post(`${BASE_URL}/auth/signup`).send(failMock);
      response.should.have.status(400);
      const { body } = response;
      expect(body).to.have.property('errors');
      const target = body.errors[0];
      expect(target).to.have.property('path');
      expect(target).to.have.property('path');
      expect(target.path).to.be.equal('email');
    });

    it('@FAIL: user exist', async () => {
      const response = await chai.request(app).post(`${BASE_URL}/auth/signup`).send(userMock);
      response.should.have.status(400);
      const { body } = response;
      expect(body).to.have.property('errors');
      const message = body.errors[0];
      expect(message).to.be.equal('Error Unable to process: invalid email');
    });
  });

  let token;

  describe('@Login', () => {
    it('@SUCCESS: login', async () => {
      const { email, password } = userMock;
      const response = await chai
        .request(app)
        .post(`${BASE_URL}/auth/login`)
        .send({ email, password });
      response.should.have.status(200);

      const body = response.body;
      expect(body).to.have.property('token');
      token = body.token;
    });

    it('@FAIL: login', async () => {
      const { email } = userMock;
      const response = await chai
        .request(app)
        .post(`${BASE_URL}/auth/login`)
        .send({ email, password: 'failpswd' });
      response.should.have.status(400);
      const { body, error } = response;

      expect(error).not.be.false;
      expect(body).to.have.property('errors');
      const message = body.errors[0];
      expect(message).to.be.equal('Error Unable to process: Credentials could not be verified.');
    });
  });

  describe('@Me', async () => {
    it('@SUCCESS: user me', async () => {
      const response = await chai
        .request(app)
        .get(`${BASE_URL}/user/me`)
        .set({ Authorization: `Token ${token}` });
      response.should.have.status(200);

      const { body } = response;
      expect(body).to.have.property('user');
      expect(body).to.have.property('wallets');
    });
  });
});
