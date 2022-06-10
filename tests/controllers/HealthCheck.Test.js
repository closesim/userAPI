const chai = require('chai');
const assert = require('assert');
const chaiHttp = require('chai-http');
const app = require('../../index');
const { API_BASE } = require('../../configs/app');

chai.use(chaiHttp);

describe('Healthcheck Test', () => {
  it('Should return 200', () => chai
    .request(app)
    .get(`${API_BASE}/healthcheck`)
    .then(({ status }) => {
      assert.equal(status, 200);
    }));
});
