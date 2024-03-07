// // test/appointmentController.test.js
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const { expect } = chai;
// const sinon = require('sinon');
// const { describe, it } = require('mocha');

// const fileLoaderController = require('../test/appointmentController');

// chai.use(chaiHttp);

// describe('Appointment Controller', function () {

//   describe('GET /api/appointments', function () {
//     it('should get all appointments', function (done) {
//       chai.request(app)
//         .get('/api/appointments')
//         .end(function (err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           done();
//         });
//     });
//   });

//   describe('POST /api/appointments/byUserName', function () {
//     it('should get appointments by user name', function (done) {
//       chai.request(app)
//         .post('/api/appointments/byUserName')
//         .send({ userName: 'exampleUser' }) // replace with valid user name
//         .end(function (err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           done();
//         });
//     });
//   });

//   describe('POST /api/appointments', function () {
//     it('should create a new appointment', function (done) {
//       chai.request(app)
//         .post('/api/appointments')
//         .send({
//           // provide appointment data for creation
//         })
//         .end(function (err, res) {
//           expect(res).to.have.status(200);
//           expect(res.text).to.equal('New appointment created successfully');
//           done();
//         });
//     });

//     it('should handle errors when creating a new appointment', function (done) {
//       chai.request(app)
//         .post('/api/appointments')
//         .send({
//           // provide invalid appointment data for creation
//         })
//         .end(function (err, res) {
//           expect(res).to.have.status(500);
//           expect(res.text).to.equal('Internal server error');
//           done();
//         });
//     });
//   });

//   describe('GET /api/appointments/:id', function () {
//     it('should get an appointment by ID', function (done) {
//       chai.request(app)
//         .get('/api/appointments/1') // replace with a valid appointment ID
//         .end(function (err, res) {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           done();
//         });
//     });

//     it('should handle errors when getting an appointment by invalid ID', function (done) {
//       chai.request(app)
//         .get('/api/appointments/invalidId')
//         .end(function (err, res) {
//           expect(res).to.have.status(500);
//           expect(res.text).to.equal('Internal server error');
//           done();
//         });
//     });

//     it('should handle not found when getting an appointment by non-existent ID', function (done) {
//       chai.request(app)
//         .get('/api/appointments/nonExistentId')
//         .end(function (err, res) {
//           expect(res).to.have.status(404);
//           expect(res.text).to.equal('Appointment not found');
//           done();
//         });
//     });
//   });

//   // Add more test cases for other CRUD operations

//   // Example: testing appointment update
//   describe('PUT /api/appointments/:id', function () {
//     it('should update an appointment by ID', function (done) {
//       chai.request(app)
//         .put('/api/appointments/1') // replace with a valid appointment ID
//         .send({
//           // provide updated appointment data
//         })
//         .end(function (err, res) {
//           expect(res).to.have.status(200);
//           expect(res.text).to.equal('Updated');
//           done();
//         });
//     });

//     it('should handle errors when updating an appointment with invalid data', function (done) {
//       chai.request(app)
//         .put('/api/appointments/1') // replace with a valid appointment ID
//         .send({
//           // provide invalid updated appointment data
//         })
//         .end(function (err, res) {
//           expect(res).to.have.status(500);
//           expect(res.text).to.equal('Internal server error');
//           done();
//         });
//     });

//     it('should handle not found when updating a non-existent appointment', function (done) {
//       chai.request(app)
//         .put('/api/appointments/nonExistentId')
//         .send({
//           // provide updated appointment data
//         })
//         .end(function (err, res) {
//           expect(res).to.have.status(404);
//           expect(res.text).to.equal('Appointment not found');
//           done();
//         });
//     });
//   });

//   // Add more test cases for other endpoints

// });
// exports.appointmentController = require('./appointmentController');