const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const loginController = require("../../controllers/logInControler"); // Corrected import

chai.use(chaiHttp);
const expect = chai.expect;

// Create a mock Express app
const app = express();
const loginRouter = express.Router();

loginRouter.post('/logIn', loginController.checkUserExist);

app.use('/login', loginRouter);

describe('Login Router', () => {
  it('should check user existence when POST /logIn is called', (done) => {
    // Assuming you have a valid request body to check user existence
    const userCredentials = {
      userName: 'testuser', // Make sure to use 'userName' instead of 'username'
      password: 'testpassword'
    };

    chai.request(app)
      .post('/login/logIn')
      .send(userCredentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add more assertions based on expected response data
        done();
      });
  });

  // Add more test cases for other scenarios, such as invalid credentials, error handling, etc.
});
