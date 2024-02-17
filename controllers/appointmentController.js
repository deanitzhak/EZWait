const Appointment = require('../models/appointment.model');
const AppointmentRepository = require('../repository/appointment.repository');
const appRepo = new AppointmentRepository(Appointment);
module.exports = {
    getAllAppointment: (req, res) => {
      appRepo.find()
      .then(appointments  => {
        res.send(appointments);
      }).catch(err => {
        console.error("Error retrieving appointment:", err);
        res.status(500).send("Internal server error");
      })
    },
    findAllByUserName: (req, res) => {
      appRepo.findByUserName(req.body.userName)
      .then(appointments  => {
        res.send(appointments);
      }).catch(err => {
        console.error("Error retrieving appointment:", err);
        res.status(500).send("Internal server error");
      })
    },
    findAppointmentByAppId: (req, res) => {
      appRepo.findAppointmentByAppId(req.body._id)
          .then(appointment => {
              if (appointment) {
                  res.send(appointment);
              } else {
                  res.status(404).send("Appointment not found");
              }
          })
          .catch(err => {
              console.error("Error retrieving appointment:", err);
              res.status(500).send("Internal server error");
          });
  },
  findAllAppointmentByStatus:(req,res) => {
    appRepo.findByStatus(req.body.status)
    .then(appointments => {
      res.send(appointments);
    })
    .catch(err =>{
      console.error("Error retrieving appointment:", err);
      res.status(500).send("Internal server error");
    });
  },
  findAppointmentByStartTime:(req,res) => {
    appRepo.findByStartTime(req.body.startTime)
    .then(appointments => {
      res.send(appointments);
    })
    .catch(err =>{
      console.error("Error retrieving appointment:", err);
      res.status(500).send("Internal server error");
    });
  },

      /*get app by app id - V
      get app by user id - X there is not value as user ID in Appointment schema
      get app stsus - V
      get app by date(startTime) - V 
      deelte app by id 
      add new app
      */
     

};
