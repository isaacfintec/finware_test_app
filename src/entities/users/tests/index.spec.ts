import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import app from '../../../app';
import SequelizeInstance from '../../../core/db/index';
import { IUserInsert } from '../domain/Interface';

chai.use(chaiHttp);
const should = chai.should();

describe('@Users', () => {
  const BASE_URL = '/api/v1/user';
  const userProps: Omit<IUserInsert, 'createdAt' | 'updatedAt' | 'id'> = {
    username: 'Alan Mathison Turing',
    email: 'alan_m_t@example.com',
    password: 'jdkslkew',
    postaladdress: 'Maida Vale, London, United Kingdom',
    birthdate: '23-06-1962',
  };

  before(async () => {
    await SequelizeInstance().init();
  });

  it('@Create: should create new user', async () => {
    const response = await chai.request(app).post(`${BASE_URL}/singup`).send(userProps);
    response.should.have.status(200);
    const body = response.body;
    expect(body).to.have.property('username');
    expect(body).to.have.property('email');
    expect(body).to.have.property('postaladdress');
    expect(body).to.have.property('birthdate');
    expect(body).not.have.property('password');

    expect(body.username).to.be.equal(userProps.username);
    expect(body.email).to.be.equal(userProps.email);
    expect(body.postaladdress).to.be.equal(userProps.postaladdress);
    expect(body.birthdate).to.be.equal(userProps.birthdate);
  });

  it('@LOGIN: should login a user', async () => {
    const response = await chai.request(app).post(`${BASE_URL}/login`).send(userProps);
    response.should.have.status(200);

    const body = response.body;
    console.log(body);
  });
});
