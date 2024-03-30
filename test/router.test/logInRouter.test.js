const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const loginController = require("../../controllers/logInControler"); // Corrected import

chai.use(chaiHttp);
const expect = chai.expect;

const app = express();
const loginRouter = express.Router();

loginRouter.post('/logIn', loginController.checkUserExist);

app.use('/login', loginRouter);

describe('Login Router', () => {
  it('should check user existence when POST /logIn is called', (done) => {
    const userCredentials = {
        userName: 'testuser',
      password: 'testpassword'
    };

    chai.request(app)
      .post('/login/logIn')
      .send(userCredentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

});
