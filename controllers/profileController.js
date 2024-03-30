const clientRepository = require('../repository/client.repository');
const client = require('../models/client.model');
const profile = require('../models/profile.model');
const profileRepository = require('../repository/profile.repository');
const profileService = require('../service/profileService');
const clientService = require('../service/clientService');
const clientRepo = new clientRepository(client);
const appRepo = new profileRepository(profile);
const {PropertyNotFound} = require("../errors/NotFound.errors");
const {ServerUnableError} = require("../errors/internal.errors");
const {ValidationError} = require("../errors/validation.errors");
module.exports = {
    getAllprofile: (req, res) => {
      appRepo.find()
      .then( profiles => {
        if(!profiles) throw new PropertyNotFound("getAllprofile");
        res.status(200).send(profiles);
      }).catch(err => {
        res.status(404).send(err.message);
      })
    },
    findAllByUserName: (req, res) => {
      appRepo.findByUserName(req.body.userName)
      .then(profiles  => {
        if(!profiles) throw new PropertyNotFound("findAllByUserName");
        res.status(200).send(profiles);
      }).catch(err => {
        res.status(404).send(err.message);
      })
    },
  findProfileByAppId: (req, res) => {
      appRepo.findProfileByAppId(req.body._id)
          .then(profile => {
                if(!profile) throw new PropertyNotFound("findProfileByAppId");
                res.status(200).send(profile);
          })
          .catch(err => {
              res.status(404).send(err.message);
          });
  },
  async findProfileByIdAndDelete(req, res) {
    try {
        const response = await appRepo.findByIdAndDelete(req.query._id); 
        if(!response) throw new ServerUnableError("findProfileByIdAndDelete");
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
},
  async findAllProfileByType(req, res) {
    try {
        const profiles = await appRepo.findByType(req.query.status);
        if(!profiles) throw new PropertyNotFound("findAllProfileByType");
        res.status(200).send(profiles);
    } catch (error) {
        res.status(404).send(error.message);
    }
},
    async submitNewProfile(req, res) {
    try {
      const newApp = await profileService.createNewProfile(req.body);
      const newClient = await clientService.SignUpcreateNewClient(newApp);
      const response1 = clientRepo.create(newClient);
      const response2 = appRepo.create(newApp);
      if(!response1 || !response2) throw new ValidationError("submitNewProfile");
      res.status(200).send("New clprofile ient created successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};

