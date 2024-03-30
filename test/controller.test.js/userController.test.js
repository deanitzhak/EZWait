const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const controller = require('../../controllers/userController.js');
const globalData = require('../../models/myUser.singleton.js');

chai.use(chaiHttp);

describe('User Controller', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should get user data', async () => {
    const userData = { username: 'testUser', email: 'test@example.com' };
    sinon.stub(globalData, 'getData').returns(userData);
    const res = { send: sinon.stub() };

    controller.getUserData(null, res);

    expect(res.send.calledOnce).to.be.true;
    expect(res.send.firstCall.args[0]).to.deep.equal(userData);
  });
});
