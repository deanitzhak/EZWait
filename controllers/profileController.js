// UserController.js

// const { client } = require('../frontend/js/APIpath');
const profile = require('../models/profile.model');
const profileRepository = require('../repository/profile.repository');
const profileService = require('../service/profileService');
const appRepo = new profileRepository(profile);
module.exports = {
    getAllprofile: (req, res) => {
      appRepo.find()
      .then( profiles => {
            res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
        res.send(profiles);
      }).catch(err => {
        console.error("Error retrieving profile:", err);
        res.status(500).send("Internal server error");
      })
    },
    findAllByUserName: (req, res) => {
      appRepo.findByUserName(req.body.userName)
      .then(profiles  => {
            res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
        res.send(profiles);
      }).catch(err => {
        console.error("Error retrieving profile:", err);
        res.status(500).send("Internal server error");
      })
    },
  findProfileByAppId: (req, res) => {
      appRepo.findProfileByAppId(req.body._id)
          .then(profile => {
              if (profile) {
                  res.send(profile);
              } else {
                  res.status(404).send("profile not found");
              }
          })
          .catch(err => {
              console.error("Error retrieving profile:", err);
              res.status(500).send("Internal server error");
          });
  },

 
  async findProfileByIdAndDelete(req, res) {
    try {
        await appRepo.findByIdAndDelete(req.query._id); 
        res.status(200).send("Deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
},

  async findAllProfileByType(req, res) {
    try {
        const profiles = await appRepo.findByType(req.query.status);
        res.status(200).send(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
},
    async submitNewProfile(req, res) {
    try {
      console.log("hey");
      const newApp = await profileService.createNewProfile(req.body);
      console.log("this is my profile : - >",newApp);
      appRepo.create(newApp);
          res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
      res.status(200).send("New clprofile ient created successfully");
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

//   findClientByAppIdAndUpdateStatus: (req, res) => {
//     const clientId = req.body._id;
//     const newStatus = "block"; // Define the new status, for example, "cancelled"

//     // Update the appointment status in the database
//     appRepo.updateClientStatus(clientId, newStatus)
//         .then(updatedClient => {
//             if (updatedClient) {
//                 res.send(updatedClient);
//             } else {
//                 res.status(404).send("client not found");
//             }
//         })
//         .catch(err => {
//             console.error("Error updating client status:", err);
//             res.status(500).send("Internal server error");
//         });
//   }
  
};

