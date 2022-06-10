const chai = require('chai');
const sandbox = require('sinon').createSandbox();
const assert = require('assert');
const chaiHttp = require('chai-http');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = require('../../index');
const UserRepository = require('../../repositories/user.repository');
const TransRepository = require('../../repositories/transactions.repository');
const redis = require('../../configs/cache');
const { API_BASE } = require('../../configs/app');

chai.use(chaiHttp);

describe('User Controller Test', () => {
  beforeEach(() => {
    sandbox.stub(UserRepository, 'createUser').resolves({ name: 'TestName', password: 'fffff' });
    sandbox.stub(TransRepository, 'logTransaction').resolves();
    sandbox.stub(jwt, 'verify').resolves({ user_name: 'TestName' });
    sandbox.stub(redis, 'get').resolves(null);
    sandbox.stub(redis, 'set').resolves(null);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Should create an user', () => {
    sandbox.stub(UserRepository, 'getByName').resolves(null);

    return chai
      .request(app)
      .post(`${API_BASE}/user/signup`)
      .send({
        name: 'TestName',
        password: 'TestName',
      })
      .then(({ status, body }) => {
        assert.equal(status, 200);
        assert(body.token);
      });
  });

  it('Should log in an user', () => {
    sandbox.stub(UserRepository, 'getByName').resolves({ name: 'TestName', password: 'fffff' });
    sandbox.stub(bcrypt, 'compare').resolves(true);

    return chai
      .request(app)
      .post(`${API_BASE}/user/login`)
      .send({
        name: 'TestName',
        password: 'TestName',
      })
      .then(({ status, body }) => {
        assert.equal(status, 200);
        assert(body.token);
      });
  });

  it('Should log out an user', () => chai
    .request(app)
    .post(`${API_BASE}/user/logout`)
    .set('authorization', 'Bearer test')
    .send({
    })
    .then(({ status }) => {
      assert(redis.get.called);
      assert(redis.set.called);
      assert.equal(status, 200);
    }));
});
