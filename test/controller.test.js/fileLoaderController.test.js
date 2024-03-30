const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { expect } = chai;
const controller = require('../../controllers/fileLoaderController.js');
const path = require('path');

chai.use(chaiHttp);

describe('View Controller', () => {
  it('should serve sign-in page', async () => {
    const filePath = path.join(__dirname, '../frontend/signIn.html');
    const sendFileStub = sinon.stub().returns(filePath);
    const res = { sendFile: sendFileStub };
    await controller.signInPage({}, res);
    expect(sendFileStub.calledOnce).to.be.true;
    expect(sendFileStub.calledWithExactly(filePath)).to.be.true;
  });

  it('should serve appointment page', async () => {
    const filePath = path.join(__dirname, '../frontend/appointment.html');
    const sendFileStub = sinon.stub().returns(filePath);
    const res = { sendFile: sendFileStub };
    await controller.appointmentPage({}, res);
    expect(sendFileStub.calledOnce).to.be.true;
    expect(sendFileStub.calledWithExactly(filePath)).to.be.true;
  });
});
