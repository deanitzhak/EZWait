const Appointment = require('../models/appointment.model');
const AppointmentRepository = require('../repository/appointment.repository');
const appointmentService = require('../service/appoinmentService');
const { ObjectId } = require("mongodb");
let i = 1;
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
  async findAppointmentByIdAndDelete(req, res) {
    try {
        await appRepo.findByIdAndDelete(req.query._id); 
        res.status(200).send("Deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
},

  async findAllAppointmentByStatus(req, res) {
    try {
        const appointments = await appRepo.findByStatus(req.query.status);
        res.status(200).send(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
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
  },
  findAppointmentByAppIdAndUpdateStatus: (req, res) => {
    const appointmentId = req.body.appointmentId;
    const newStatus = req.body.status; 
    appRepo.updateAppointmentStatus(appointmentId, newStatus)
        .then(updatedAppointment => {
            if (updatedAppointment) {
                res.send(updatedAppointment);
            } else {
                res.status(404).send("Appointment not found");
            }
        })
        .catch(err => {
            console.error("Error updating appointment status:", err);
            res.status(500).send("Internal server error");
        });
  },
  async updateAppointment(req, res) {
    try {
      let newApp = req.body.newAppointment;
      //const oldDate = req.body.oldDate
      newApp = await appointmentService.updateNewAppointment(newApp);
      console.log('newApp',newApp);
      const appointmentId = newApp.appointmentId;
      console.log('appointmentId',appointmentId);

      await appRepo.findByIdAndDeleteByAtributeAppointmentId(appointmentId,newApp);
      await appRepo.create(newApp);
      res.send(true);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
};

