const appointmentModel = require('../models/appointment.model');

const EnumStatus = {
    VALUE1: 'Upcoming',
    VALUE2: 'Cancelled',
    VALUE3: 'Completed'
};

async function createNewAppointment(newAppointmentJSON) {
    switch (newAppointmentJSON.Appointment.type) {
        case "1":
            newAppointmentJSON.Appointment.type = "value1";
            break;
        case "2":
            newAppointmentJSON.Appointment.type = "value2";
            break;
        case "3":
            newAppointmentJSON.Appointment.type = "value3";
            break;
    }
    const _timeString = convertTimeString(newAppointmentJSON.Appointment.startTime);
    const _dateString = coverDateString(newAppointmentJSON.Appointment.date);
    const newAppointment = new appointmentModel({
        appointmentId: newAppointmentJSON.Appointment.appointmentId,
        userName: newAppointmentJSON.Appointment.userName,
        firstName: newAppointmentJSON.Appointment.firstName,
        lastName: newAppointmentJSON.Appointment.lastName,
        type :newAppointmentJSON.Appointment.type,
        status: EnumStatus.VALUE1,
        date: _dateString, 
        startTime: _timeString,
        duration : newAppointmentJSON.Appointment.duration,
        timeStamp: new Date()
    });
    console.log(newAppointment);
    return newAppointment; 
}
module.exports = {
    createNewAppointment
};
function convertTimeString(timeString)
{
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    date.setHours(parseInt(hours, 10));
    date.setMinutes(parseInt(minutes, 10));
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date
}
function coverDateString(dateString)
{
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date ;
}