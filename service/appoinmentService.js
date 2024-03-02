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
    const _date = combainDateAndHoursToDate(newAppointmentJSON.Appointment.startTime, newAppointmentJSON.Appointment.date);
    const newAppointment = new appointmentModel({
        appointmentId: newAppointmentJSON.Appointment.appointmentId,
        userName: newAppointmentJSON.Appointment.userName,
        firstName: newAppointmentJSON.Appointment.firstName,
        lastName: newAppointmentJSON.Appointment.lastName,
        type :newAppointmentJSON.Appointment.type,
        status: EnumStatus.VALUE1,
        date: _date, 
        startTime: _date,
        duration : newAppointmentJSON.Appointment.duration,
        timeStamp: new Date()
    });
    console.log(newAppointment);
    return newAppointment; 
}
async  function updateNewAppointment(appointmentJSON) {
    switch (appointmentJSON.type) {
        case "1":
            appointmentJSON.type = "value1";
            break;
        case "2":
            appointmentJSON.type = "value2";
            break;
        case "3":
            appointmentJSON.type = "value3";
            break;
    }
    const _date = combainDateAndHoursToDate(appointmentJSON.startTime, appointmentJSON.date);
    const newAppointment = new appointmentModel({
        appointmentId: appointmentJSON.appointmentId,
        userName: appointmentJSON.userName,
        firstName: appointmentJSON.firstName,
        lastName: appointmentJSON.lastName,
        type :appointmentJSON.type,
        status: appointmentJSON.status,
        date: _date, 
        startTime: _date,
        duration : appointmentJSON.duration,
        timeStamp: new Date()
    });
    return newAppointment;
}
module.exports = {
    createNewAppointment,
    updateNewAppointment
};
function combainDateAndHoursToDate(time,_date)
{
    const date = new Date(_date);
    const [startHour, startMinute] = time.split(':').map(Number);
    date.setUTCHours(startHour);
    date.setUTCMinutes(startMinute);
    const newDate = new Date(date);
    return newDate;
}