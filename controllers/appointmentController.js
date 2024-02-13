const Appointment = require('../models/appointment.model');
const AppointmentRepository = require('../reposetory/appointment.repository');
module.exports = {
    getAllAppointment: (req, res) => {
    const appRepo = new AppointmentRepository(Appointment);
      appRepo.findByUserName(req.body.userName)
      .then(appointments  => {
        res.send(appointments);
      }).catch(err => {
        res.send(err);
      })
    },
    findAllByUserName: (req, res) => {
        console.log("Handling findAllByUserName request");
        res.send("Appointments retrieved by user name");
    }
};
