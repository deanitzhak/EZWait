// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = chai;
// const sinon = require('sinon');
// const app = require('../index.js');
// const app = require('../Models/myUser.singleton'); // Update with the correct path to your app
// // const { expect } = chai;

// chai.use(chaiHttp);

// const ProfileRepository = require('../repository/schedule.repository');
// const User = require('../models/schedule.model');
// const globalData = require('../models/myUser.singleton');

// describe('User Authentication Controller', () => {
//   describe('POST /checkUserExist', () => {
//     it('should check if the user exists and set data in globalData', (done) => {
//       const userCredentials = {
//         userName: 'exampleUser',
//         password: 'examplePassword',
//       };

//       chai.request(app)
//         .post('/checkUserExist') // Update with your actual route
//         .send(userCredentials)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('userName', 'exampleUser'); // Adjust based on your response structure

//           // Check if data is set in globalData
//           const myUser = globalData.getData('myUser');
//           expect(myUser).to.be.an('object');
//           expect(myUser).to.have.property('userName', 'exampleUser');

//           done();
//         });
//     });

//     it('should handle invalid user data', (done) => {
//       const invalidCredentials = {
//         userName: 'nonExistentUser',
//         password: 'invalidPassword',
//       };

//       chai.request(app)
//         .post('/checkUserExist') // Update with your actual route
//         .send(invalidCredentials)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.text).to.equal('Invalid Data');
//           done();
//         });
//     });
//   });
// });
