import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import SequelizeInstance from '../../../core/db/index';
import { failMock, userMock } from './mocks';

chai.use(chaiHttp);
const should = chai.should();

describe('@Users: API', () => {
  const BASE_URL = '/api/v1/user';

  before(async () => {
    await SequelizeInstance().init();
  });

  describe('@Create', () => {
    it('@SUCCESS: should create new user', async () => {
      const response = await chai.request(app).post(`${BASE_URL}/singup`).send(userMock);
      response.should.have.status(200);
      const body = response.body;
      expect(body).to.have.property('username');
      expect(body).to.have.property('email');
      expect(body).to.have.property('postaladdress');
      expect(body).to.have.property('birthdate');
      expect(body).not.have.property('password');

      expect(body.username).to.be.equal(userMock.username);
      expect(body.email).to.be.equal(userMock.email);
      expect(body.postaladdress).to.be.equal(userMock.postaladdress);
      expect(body.birthdate).to.be.equal(userMock.birthdate);
    });

    it('@FAIL: should fail when create a new user', async () => {
      const response = await chai.request(app).post(`${BASE_URL}/singup`).send(failMock);
      response.should.have.status(400);
      const body = response.body;
      expect(body).to.have.property('errors');
      const target = body.errors[0];
      expect(target).to.have.property('path');
      expect(target).to.have.property('path');
      expect(target.path).to.be.equal('email');
    });
  });

  describe('@Login', () => {
    it('@SUCCESS: login', async () => {
      const { email, password } = userMock;
      const response = await chai.request(app).post(`${BASE_URL}/login`).send({ email, password });
      response.should.have.status(200);

      const body = response.body;
      expect(body).to.have.property('token');
    });

    it('@FAIL: login', async () => {
      const { email } = userMock;
      const response = await chai
        .request(app)
        .post(`${BASE_URL}/login`)
        .send({ email, password: 'failpswd' });
      response.should.have.status(400);
      const body = response.body;
      const error = response.error;
      expect(error).not.be.false;
      expect(body).to.have.property('errors');
      const target = body.errors[0];
      expect(target).to.have.property('message');
      expect(target.message).to.be.equal('Unable to process: Credentials could not be verified.');
    });
  });
});
