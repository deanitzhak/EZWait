const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
const clientController = require("../../routers/clientRouter");

chai.use(chaiHttp);
const expect = chai.expect;

const app = express();
describe('Client Router', () => {
  it('should return all clients when GET /allClient is called', (done) => {
    chai.request(app)
      .get('/clients/allClient')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return clients by username when GET /findAllByUserName is called', (done) => {
    chai.request(app)
      .get('/clients/findAllByUserName')
      .query({ username: 'testuser' }) // Assuming 'testuser' exists
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return client by app ID when GET /findClientByAppId is called', (done) => {
    chai.request(app)
      .get('/clients/findClientByAppId')
      .query({ appId: '123456' }) // Assuming '123456' is a valid app ID
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should return clients by status when GET /findAllClientByStatus is called', (done) => {
    chai.request(app)
      .get('/clients/findAllClientByStatus')
      .query({ status: 'active' }) // Assuming 'active' is a valid status
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should find client by ID and delete when GET /findClientByIdAndDelete is called', (done) => {
    chai.request(app)
      .get('/clients/findClientByIdAndDelete')
      .query({ clientId: '123456' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should submit new client when POST /submitNewClient is called', (done) => {
    const newClient = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };

    chai.request(app)
      .post('/clients/submitNewClient')
      .send(newClient)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should update client status when PUT /updateClientStatus is called', (done) => {
    const updatedClient = {
      clientId: '123456',
      status: 'inactive'
    };

    chai.request(app)
      .put('/clients/updateClientStatus')
      .send(updatedClient)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

});
