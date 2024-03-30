
const Appointment = require('../models/appointment.model');
const Schedule = require('../models/schedule.model');
const scheduleRepository = require('../repository/schedule.repository');
const AppointmentRepository = require('../repository/appointment.repository');
const appointmentService = require('../service/appoinmentService');
const appRepo = new AppointmentRepository(Appointment);
const scheduleRepo = new scheduleRepository(Schedule);
const {PropertyNotFound} = require("../errors/NotFound.errors");
const {ServerUnableError} = require("../errors/internal.errors");
module.exports = {
    getAllAppointment: (req, res) => {
      appRepo.find()
      .then(appointments  => {
        if(!appointments) throw new PropertyNotFound("getAllAppointment")
        res.status(200).send(appointments);
      }).catch(err => {
        res.status(404).send(err.message);
      })
    },
    findAllByUserName: (req, res) => {
      appRepo.findByUserName(req.body.userName)
      .then(appointments  => {
        if(!appointments) throw new PropertyNotFound("findAllByUserName")
        res.status(200).send(appointments);
      }).catch(err => {
        res.status(404).send(err.message);
      })
    },
  findAppointmentByAppId: (req, res) => {
      appRepo.findAppointmentByAppId(req.body._id)
          .then(appointment => {
              if(!appointment) throw new PropertyNotFound("findAppointmentByAppId")
              res.status(200).send(appointment);      
          })
          .catch(err => {
              res.status(404).send(err.message);
          });
  },
  findAppointmentByStartTime:(req,res) => {
    appRepo.findByStartTime(req.body.startTime)
    .then(appointments => {
      if(!appointments) throw new PropertyNotFound("findAppointmentByStartTime")
      res.status(200).send(appointments);      
    })
    .catch(err =>{
      res.status(404).send(err.message);
    });
  },
  async findAppointmentByIdAndDelete(req, res) {
    try {
        const response = await appRepo.findByIdAndDelete(req.query._id); 
        if(!response) throw new ServerUnableError("findAppointmentByIdAndDelete")
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send(error.message);
    }
},

  async findAllAppointmentByStatus(req, res) {
    try {
      const appointments = await appRepo.findByStatus(req.query.status);
      if(!appointments) throw new PropertyNotFound("findAllAppointmentByStatus")
      res.status(200).send(appointments);
    } catch (error) {
        console.error(error);
        res.status(404).send(error.message);
    }
},
    async submitNewAppointment(req, res) {
    try {
      const newApp = await appointmentService.createNewAppointment(req.body);
      const response = appRepo.create(newApp);
      if(!response) throw new ServerUnableError("submitNewAppointment")
      res.status(200).send(response);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  findAppointmentByAppIdAndUpdateStatus: (req, res) => {
    const appointmentId = req.body.appointmentId;
    const newStatus = req.body.status; 
    appRepo.updateAppointmentStatus(appointmentId, newStatus)
        .then(updatedAppointment => {
            if(!updatedAppointment) throw new PropertyNotFound("findAppointmentByAppIdAndUpdateStatus")
            res.status(200).send(updatedAppointment);
        })
        .catch(err => {
            res.status(404).send(err.message);
        });
  },
  async updateAppointment(req, res) {
    try {
      let newApp = req.body.newAppointment;
      newApp = await appointmentService.updateNewAppointment(newApp);
      const appointmentId = newApp.appointmentId;
      await appRepo.findByIdAndDeleteByAtributeAppointmentId(appointmentId,newApp);
      const response = await appRepo.create(newApp);
      if(!response) throw new ServerUnableError("updateAppointment")
      res.status(200).send(true);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal server error");
    }
  },
  async findAllAppointmentByDate(req, res) {
    try {
      const dateString = req.query.date;
      const dateObject = new Date(dateString);
      const year = dateObject.getFullYear();
      const month = String(dateObject.getMonth() + 1).padStart(2, '0'); 
      const day = String(dateObject.getDate()).padStart(2, '0');
      const sc = await scheduleRepo.findByDayMonthYear(day, month, year);
      const appointmentsIds = sc.takenHours.appointments.map(appointment => appointment.appointmentId);
      const appointmentArray = [];
      for (let i = 0; i < appointmentsIds.length; i++) {
          const appointmentId = appointmentsIds[i];
          let appointment = await appRepo.findAppointmentByAppIdAttribute(appointmentId);
          appointmentArray.push(appointment);
      }
      if(!appointmentArray) throw new PropertyNotFound("findAllAppointmentByDate")
      res.status(200).send(appointmentArray);
    } catch (error) {
        res.status(500).send(error.message);
    }
  },
};

