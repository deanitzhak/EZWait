const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const userRouter = require("../../routers/userRouter");

chai.use(chaiHttp);
const expect = chai.expect;

const app = express();

app.use('/user', userRouter);

describe('User Router', () => {
  it('should get user data when GET /getUserData is called', (done) => {
    chai.request(app)
      .get('/user/getUserData')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

});
