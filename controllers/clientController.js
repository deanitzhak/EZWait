const client = require('../models/client.model');
const clientRepository = require('../repository/client.repository');
const clientService = require('../service/clientService');
const appRepo = new clientRepository(client);
const globalData = require('../models/myUser.singleton');
const {PropertyNotFound} = require("../errors/NotFound.errors");
const {ServerUnableError} = require("../errors/internal.errors");

module.exports = {
    getAllclient: (req, res) => {
      appRepo.find()
      .then( clients => {
        if(!clients) throw new PropertyNotFound("getAllclient");
        res.status(200).send(clients);
      }).catch(err => {
        res.status(500).send(err.message);
      })
    },
    findAllByUserName: (req, res) => {
      let my_user_name = req.query.userName
      appRepo.findByUserName(my_user_name)
      .then(clients  => {
        if(!clients) throw new PropertyNotFound("findAllByUserName");
        res.status(200).send(clients);
      }).catch(err => {
        res.status(500).send(err.message);
      })
    },
  findClientByAppId: (req, res) => {
      appRepo.findClientByAppId(req.body._id)
          .then(client => {
              if(!client) throw new PropertyNotFound("findClientByAppId");
              res.status.send(client);
          })
          .catch(err => {
              console.error("Error retrieving client:", err);
              res.status(500).send("Internal server error");
          });
  },
  async findClientByIdAndDelete(req, res) {
    try {
        const response = await appRepo.findByIdAndDelete(req.query._id); 
        if(!response) throw new ServerUnableError("findClientByIdAndDelete");
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
},
  async findAllClientByStatus(req, res) {
    try {
        const clients = await appRepo.findByStatus(req.query.status);
        if(!clients) throw new PropertyNotFound("findAllClientByStatus");
        res.status(200).send(clients);
    } catch (error) {
        res.status(500).send(error.message);
    }
},
async submitNewClient(req, res) {
    try {
      const newApp = await clientService.createNewClient(req.body);
      const response = appRepo.create(newApp);
      if(!response) throw new ServerUnableError("submitNewClient");
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  findClientByAppIdAndUpdateStatus: (req, res) => {
    const clientId = req.body._id;
    const newStatus = "block"; 
    appRepo.updateClientStatus(clientId, newStatus)
        .then(updatedClient => {
            if(!updatedClient) throw new PropertyNotFound("findClientByAppIdAndUpdateStatus");
            res.status(200).send(updatedClient);
        })
        .catch(err => {
            res.status(500).send(err.message);
        });
  },async submitNewSubClient(req, res) {
    try {
      const myUser = globalData.getData("myUser");
      const myClient = await appRepo.findByUserName(myUser.userName);
      const newSubClientS = req.body.subClient;
      myClient.subClients.push(newSubClientS);
      const response = myClient.save();
      if(!response) throw new ServerUnableError("submitNewSubClient");
      res.status(200).send(response);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },async updateClientData(req, res) {
    try {
      const myClient = req.body.Client;
      const myClientEdit = await clientService.createUpdateClientData(myClient);
      const response = await appRepo.updateClientData(myClientEdit);
      if(!response) throw new ServerUnableError("updateClientData");
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
};


