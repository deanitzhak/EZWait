// const chai = require('chai');
// const chaiHttp = require('chai-http');
// // import app from 'test/fileLoaderController.test.js'; // Update the path accordingly
// const { expect } = chai;
// const sinon = require('sinon');
// const { describe, it } = require('mocha');
// const fileLoaderController = require('../controllers/fileLoaderController');

// chai.use(chaiHttp);

// describe('File Loader Controller', () => {
//     describe('GET /signIn.html', () => {
//       it('should return the sign-in page', (done) => {
//         chai.request(app)
//           .get('../Frontend/signIn.html')
//           .end((err, res) => {
//             expect(res).to.have.status(200);
//             done();
//           });
//       });
//     });
  
//     describe('GET /appointment', () => {
//       it('should return the appointment page', (done) => {
//         chai.request(app)
//           .get('../Frontend/appointment.html')
//           .end((err, res) => {
//             expect(res).to.have.status(200);
//             // Add more assertions based on your appointment page response
//             done();
//           });
//       });
//     });
//   });
// // module.exports = app;

const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const { describe, it } = require('mocha');
const app = require('../controllers/fileLoaderController'); // Update the path accordingly

chai.use(chaiHttp);

describe('File Loader Controller', () => {
    describe('GET /signIn.html', () => {
        it('should return the sign-in page', (done) => {
            chai.request(app)
                .get('/signIn.html')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });

    describe('GET /appointment.html', () => {
        it('should return the appointment page', (done) => {
            chai.request(app)
                .get('/appointment.html')
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });
    });
});
