const { appointment } = require('../frontend/js/APIpath');
const profile = require('../models/profile.model');
const ProfileRepository = require('../repository/profile.repository');

const appRepo = new ProfileRepository(profile);
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
                  res.status(404).send("Profile not found");
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

  async findAllProfileByStatus(req, res) {
    try {
        const profiles = await appRepo.findByStatus(req.query.status);
        res.status(200).send(profiles);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
},
    async submitNewProfile(req, res) {
    try {
      const newApp = await profileService.createNewProfile(req.body);
      console.log(newApp);
      appRepo.create(newApp);
      res.status(200).send("New profile created successfully");
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },

  findProfileByAppIdAndUpdateStatus: (req, res) => {
    const appointmentId = req.body._id;
    const newStatus = "block"; // Define the new status, for example, "cancelled"

    // Update the appointment status in the database
    appRepo.updateAppointmentStatus(profileID, newStatus)
        .then(updatedProfile => {
            if (updatedProfile) {
                res.send(updatedProfile);
            } else {
                res.status(404).send("profile not found");
            }
        })
        .catch(err => {
            console.error("Error updating profile status:", err);
            res.status(500).send("Internal server error");
        });
  }
  
};

