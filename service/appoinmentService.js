const appointmentModel = require('../models/appointment.model');

const EnumStatus = {
    VALUE1: 'Upcoming',
    VALUE2: 'Cancelled',
    VALUE3: 'Completed'
};

async function createNewAppointment(newAppointmentJSON) {
    const newAppointment = new appointmentModel({
        userName: newAppointmentJSON.Appointment.userName,
        firstName: newAppointmentJSON.Appointment.firstName,
        lastName: newAppointmentJSON.Appointment.lastName,
        status: EnumStatus.VALUE1,
        time: newAppointmentJSON.Appointment.time,
        date: newAppointmentJSON.Appointment.time, 
        timeStamp: new Date(),
        type :newAppointmentJSON.Appointment.type
    });
    console.log( newAppointment);
    return newAppointment; 
}

module.exports = {
    createNewAppointment
};
