const clientRepository = require('../repository/client.repository');
const client = require('../models/client.model');
const profile = require('../models/profile.model');
const profileRepository = require('../repository/profile.repository');
const profileService = require('../service/profileService');
const clientService = require('../service/clientService');
const clientRepo = new clientRepository(client);
const appRepo = new profileRepository(profile);
module.exports = {
    getAllprofile: (req, res) => {
      appRepo.find()
      .then( profiles => {
        res.send(profiles);
      }).catch(err => {
        console.error("Error retrieving profile:", err);
        res.status(500).send("Internal server error");
      })
    },
    findAllByUserName: (req, res) => {
      appRepo.findByUserName(req.body.userName)
      .then(profiles  => {
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
      const newApp = await profileService.createNewProfile(req.body);
      const newClient = await clientService.SignUpcreateNewClient(newApp);
      console.log("this is my clint : <><><><>- >",newClient);
      clientRepo.create(newClient);
      appRepo.create(newApp);
      res.status(200).send("New clprofile ient created successfully");
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
};

