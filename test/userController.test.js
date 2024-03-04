const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const sinon = require('sinon');
const app = require('../index.js'); // Update with the correct path to your app
const globalData = require('../models/myUser.singleton');

chai.use(chaiHttp);


describe('User Data API Tests', () => {
    describe('GET /userData', () => {
      it('should get user data', () => {
      const getDataStub = sinon.stub(globalData, 'getData').returns({ name: 'John Doe', age: 25 });

      chai.request(app)
        .get('/userData')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.deep.equal({ name: 'John Doe', age: 25 });
          
          // Restore the stub after the test
          getDataStub.restore();
          done();
        });
    });
  });

  // Add more test cases as needed
});
