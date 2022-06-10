const chai = require('chai');
const sandbox = require('sinon').createSandbox();
const assert = require('assert');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const app = require('../../index');
const TransRepository = require('../../repositories/transactions.repository');
const redis = require('../../configs/cache');
const { API_BASE } = require('../../configs/app');

chai.use(chaiHttp);

describe('AVR Controller Test', () => {
  beforeEach(() => {
    sandbox.stub(TransRepository, 'logTransaction').resolves();
    sandbox.stub(jwt, 'verify').resolves({ user_name: 'TestName' });
    sandbox.stub(redis, 'get').resolves(null);
    sandbox.stub(redis, 'set').resolves(null);
  });

  afterEach(() => {
    sandbox.restore();
  });
 
 it('Should search some coordinates', () => chai
    .request(app)
    .post(`${API_BASE}/avr-data/search`)
    .set('authorization', 'Bearer test')
    .send({
      lat: -54.810,
      lon: -68.315,
      radius: 100,
    })
    .then(({ status }) => {
      assert(redis.get.called);
      assert.equal(status, 200);
    }));

});