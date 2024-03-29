const client = require('../models/client.model');
const clientRepository = require('../repository/client.repository');
const clientService = require('../service/clientService');
const appRepo = new clientRepository(client);
const globalData = require('../models/myUser.singleton');
module.exports = {
    getAllclient: (req, res) => {
      appRepo.find()
      .then( clients => {
        res.send(clients);
      }).catch(err => {
        console.error("Error retrieving client:", err);
        res.status(500).send("Internal server error");
      })
    },
    findAllByUserName: (req, res) => {
      let my_user_name = req.query.userName
      appRepo.findByUserName(my_user_name)
      .then(clients  => {
        res.send(clients).status(200);
      }).catch(err => {
        console.error("Error retrieving client:", err);
        res.status(404).send("Internal server error");
      })
    },
  findClientByAppId: (req, res) => {
      appRepo.findClientByAppId(req.body._id)
          .then(client => {
              if (client) {
                  res.send(client);
              } else {
                  res.status(404).send("Client not found");
              }
          })
          .catch(err => {
              console.error("Error retrieving client:", err);
              res.status(500).send("Internal server error");
          });
  },
  async findClientByIdAndDelete(req, res) {
    try {
        await appRepo.findByIdAndDelete(req.query._id); 
        res.status(200).send("Deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
},
  async findAllClientByStatus(req, res) {
    try {
        const clients = await appRepo.findByStatus(req.query.status);
        res.status(200).send(clients);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
},
async submitNewClient(req, res) {
    try {
      const newApp = await clientService.createNewClient(req.body);
      appRepo.create(newApp);
      res.status(200).send("New client created successfully");
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
  findClientByAppIdAndUpdateStatus: (req, res) => {
    const clientId = req.body._id;
    const newStatus = "block"; 
    appRepo.updateClientStatus(clientId, newStatus)
        .then(updatedClient => {
            if (updatedClient) {
                res.send(updatedClient);
            } else {
                res.status(404).send("client not found");
            }
        })
        .catch(err => {
            console.error("Error updating client status:", err);
            res.status(500).send("Internal server error");
        });
  },async submitNewSubClient(req, res) {
    try {
      const myUser = globalData.getData("myUser");
      const myClient = await appRepo.findByUserName(myUser.userName);
      const newSubClientS = req.body.subClient;
      myClient.subClients.push(newSubClientS);
      console.log(myClient.subClients);
      myClient.save();
      res.status(200).send("New client created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },async updateClientData(req, res) {
    try {
      const myClient = req.body.Client;
      const myClientEdit = await clientService.createUpdateClientData(myClient);
      await appRepo.updateClientData(myClientEdit);
      res.status(200).send("New client created successfully");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
};


