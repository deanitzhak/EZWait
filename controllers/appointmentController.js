const { appointment } = require('../frontend/js/APIpath');
const Appointment = require('../models/appointment.model');
const AppointmentRepository = require('../repository/appointment.repository');
const appointmentService = require('../service/appoinmentService');
const { ObjectId } = require("mongodb");

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
    const appointmentId = req.body._id;
    const newStatus = "cancelled"; // Define the new status, for example, "cancelled"

    // Update the appointment status in the database
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
      const newApp = await appointmentService.updateNewAppointment(req.body);
      const _appointmentId = new ObjectId(newApp.appointmentId);
      const deletedAppointment = await appRepo.findByIdAndDeleteByAtributeAppointmentId(_appointmentId,newApp);
      if (!deletedAppointment) {
          throw new Error(`Appointment with ID ${_appointmentId} not found.`);
      }
      else{
        appRepo.create(newApp);
        res.status(200).send("Updated");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  }
};

