const { appointment } = require('../frontend/js/APIpath');
const Appointment = require('../models/appointment.model');
const AppointmentRepository = require('../repository/appointment.repository');
const appointmentService = require('../service/appoinmentService');

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
  findAppointmentByIdAndDelete:(req,res) => {
    appRepo.findByIdAndDelete(req.body._id)
    .then(appointments => {
      res.send(appointments);
    })
    .catch(err =>{
      console.error("Error retrieving appointment:", err);
      res.status(500).send("Internal server error");
    });
  },
  async submitNewAppointment(req, res) {
    try {
       const newApp = await appointmentService.createNewAppointment(req.body);
      appRepo.create(newApp);
      res.status(200).send("New appointment created successfully");
      
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
};

