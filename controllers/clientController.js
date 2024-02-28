const { client } = require('../frontend/js/APIpath');
const client = require('../models/client.model');
const clientRepository = require('../repository/client.repository');
const clientService = require('../service/clientService');
const appRepo = new clientRepository(client);
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
      appRepo.findByUserName(req.body.userName)
      .then(clients  => {
        res.send(clients);
      }).catch(err => {
        console.error("Error retrieving client:", err);
        res.status(500).send("Internal server error");
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
      const newApp = await profileService.createNewClient(req.body);
      console.log(newApp);
      appRepo.create(newApp);
      res.status(200).send("New client created successfully");
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  findClientByAppIdAndUpdateStatus: (req, res) => {
    const clientId = req.body._id;
    const newStatus = "block"; // Define the new status, for example, "cancelled"

    // Update the appointment status in the database
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
  }
  
};

