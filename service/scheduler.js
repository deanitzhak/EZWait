const ScheduleRepository = require('../repository/schedule.repository');
const Schedule = require('../models/schedule.model');
const { ObjectId } = require("mongodb");
const schedRepo = new ScheduleRepository(Schedule);
let duration;
const moment = require('moment');
const currentDate = new Date();
/*this flag is indicate if a new day is opend or not*/
let defultCreate; 
const EnumType = {
    VALUE1: "1",
    VALUE2: "2",
    VALUE3: "3",
};
module.exports = {
    async scheduleNewAppointment(req, res) {
        try {
            defultCreate = false;
            let newAppointmentObj = JSON.parse(req.query.newAppointment);
            const dateStr = newAppointmentObj.Appointment.date;
            const startTime = newAppointmentObj.Appointment.startTime; 
            const date = newAppointmentObj.Appointment.date;
            const type = newAppointmentObj.Appointment.type;
            const newAppFormatedStartTime = combineDateAndHoursToDate(startTime ,dateStr);
            const newAppFormatedEndTime = calculateDuration(startTime, type,date);
            /*get the schedule of the input day*/
            const _date = new Date(dateStr);
            let schedule = await getScheduleByDate(_date);
            const formattedEndTime = getFormattedDateEndTime (newAppFormatedEndTime);
            /*if there is no appoontment so ther is no sched if the is no sech so create defult*/
            /*get the start day and the end of working hours*/
            /*cheking if the appointment is taken*/
            if(date < currentDate){
                throw new Error("Can't set appointment");
            }
            const validTime = checkValidTime(schedule,startTime,formattedEndTime);
            if(validTime != true){
                throw new Error("Time is not valid");                   
            }
            let appointments = schedule.takenHours.appointments;
            /*formated to be able to compare*/
            if(newAppFormatedStartTime < currentDate){
                throw new Error("Can't set appointment");
            }
            const isTaken = checkTakenTime(appointments,newAppFormatedStartTime,newAppFormatedEndTime);
            if(isTaken != true){
                throw new Error("appointment is taken");
            }
            const appointmentId = new ObjectId();
            const newAppointment = createNewAppointmentScheduleFormat(newAppFormatedStartTime,duration,appointmentId);
       
            appointments.push(newAppointment);
            appointments.sort();
            schedule.takenHours.appointments = appointments;
            if(defultCreate){
                schedule.save();
                defultCreate = false;
                res.send(newAppointment.appointmentId);
            }else{
                schedRepo.updateScheduleValueTwoKeys(schedule._id,"takenHours","appointments",appointments);
                res.send(newAppointment.appointmentId);
            }
        } catch (error) {
            console.error('Error processing appointment data:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async reScheduleNewAppointment(req, res) 
    {
        try {
            let newAppointment = req.body.newRescheduleAppointment;
            const appointmentIdToFind = new ObjectId(newAppointment.appointmentId);
            const oldDate = req.body.oldDate;
            const dateStr = newAppointment.date;
            const startTime = newAppointment.startTime;
            const type = newAppointment.type;
            const newAppFormattedStartTime = combineDateAndHoursToDate(startTime, dateStr);
            const newAppFormattedEndTime = calculateDuration(startTime, type, dateStr);
            const formattedEndTime = getFormattedDateEndTime(newAppFormattedEndTime);
            const currentDate = new Date();
            const _oldDate = new Date(oldDate);
            const scheduleDate = new Date(dateStr);
            let schedule = await getScheduleByDate(scheduleDate);
            const isInSchedule = isAppointmentIdInSchedule(appointmentIdToFind, schedule);
            const isPastDate = scheduleDate < currentDate;
            if (isInSchedule) {
                if (isPastDate) {
                    throw new Error("Can't set appointment for past dates");
                }
            }
            const isValidTime = checkValidTime(schedule, newAppFormattedStartTime, formattedEndTime);   
            if (!isValidTime) {
                throw new Error("Appointment time is invalid or already taken");
            }
            let updatedAppointments = schedule.takenHours.appointments;
            const isTaken = checkTakenTime(updatedAppointments, newAppFormattedStartTime, newAppFormattedEndTime);
            if (!isTaken) {
                throw new Error("Appointment is taken");
            }
                            /*remove from old Schedule */
                /*Update appointment*/ 
                const newRescheduledAppointment = createNewAppointmentScheduleFormat(newAppFormattedStartTime, duration, appointmentIdToFind);
                schedule.takenHours.appointments = updatedAppointments;
                schedule.takenHours.appointments.push(newRescheduledAppointment);
                schedule.takenHours.appointments.sort();
                if (defultCreate) {
                    schedRepo.removeAppointmentFromScheduleByAttributeAppointmentId(appointmentIdToFind, _oldDate);
                    await schedule.save();
                } else {
                    /*update new Schedule*/
                    schedRepo.removeAppointmentFromScheduleByAttributeAppointmentId(appointmentIdToFind, _oldDate);
                    await schedRepo.updateScheduleValueTwoKeys(schedule._id, "takenHours", "appointments", updatedAppointments);
                }
                res.status(200).send(true);
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    async cancelAppointmentById(req, res) 
    {
        const appointment =  req.body;
        const appointmentId = new ObjectId(appointment.appointmentId);
        const date = new Date(appointment.date);
     
        const isDeleted =  await schedRepo.removeAppointmentFromScheduleByAttributeAppointmentId(appointmentId, date);
        res.status(200).send(isDeleted);
    }

};
function isAppointmentIdInSchedule(appointmentIdToFind, schedule) {
    return schedule.takenHours.appointments.some(appointment => appointment.appointmentId.equals(appointmentIdToFind));
}


async function getScheduleByDate (newDate)
{
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    let schedule = await schedRepo.findByDayMonthYear(day, month, year);
    /*if the schedule is exsist*/
    if (schedule === null) {
        schedule = createDefultSchedule(day,month,year);
        defultCreate = true;
    } 
    return schedule;
}
function checkValidTime(schedule,startTime,formattedEndTime){
    const { startTime: defsStartTime, endTime: defEndTime } = schedule.workingHours;
    if (startTime < defsStartTime || formattedEndTime > defEndTime ||(formattedEndTime >= '00:00' && formattedEndTime < '05:00')) {
        throw new Error("Can't set appointment");
    }
return true;
}
function checkTakenTime(appointments, newAppFormatedStartTime, newAppFormatedEndTime) {
    const newStartTime = moment(newAppFormatedStartTime, "YYYY-MM-DDTHH:mm:ssZ");
    const newEndTime = moment(newAppFormatedEndTime, "YYYY-MM-DDTHH:mm:ssZ");
    for (const takenTime of appointments) {
        const { startAppointment, duration } = takenTime;
        const endTime = moment(startAppointment, "YYYY-MM-DDTHH:mm:ssZ").add(duration, 'hours');
        if (newStartTime.isBefore(endTime) && newEndTime.isAfter(startAppointment)) {
            throw new Error("Appointment is taken");
        }
    }
    return true;
}
function getFormattedDateEndTime(newAppFormatedEndTime){
    const hours = newAppFormatedEndTime.getUTCHours();
    const minutes = newAppFormatedEndTime.getUTCMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedEndTime = `${formattedHours}:${formattedMinutes}`;
    return formattedEndTime
}
function combineDateAndHoursToDate(time,_date)
{
    const date = new Date(_date);
    const [startHour, startMinute] = time.split(':').map(Number);
    date.setUTCHours(startHour);
    date.setUTCMinutes(startMinute);
    const newDate = new Date(date);
    return newDate;
}
function calculateDuration(startTime, type, _date) {
    duration = getDurationByType(type); // Duration in milliseconds
    const date = new Date(_date);
    const [startHour, startMinute] = startTime.split(':').map(Number);
    date.setUTCHours(startHour);
    date.setUTCMinutes(startMinute);
    const endTime = new Date(date.getTime() + duration);
    duration = (duration/1000/60/60);
    return endTime;
}
function addHoursToDate(dateString, hours) {
    const date = new Date(dateString);
    date.setHours(date.getHours() + hours);
    return date.toISOString();
}

function getDurationByType(type) {
    switch (type) {
        case EnumType.VALUE1:
            return 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        case EnumType.VALUE2:
            return 3 * 60 * 60 * 1000;
        case EnumType.VALUE3:
            return 1 * 60 * 60 * 1000; // 1 hour in milliseconds
        default:
            return 0; // Default duration
    }
}
function createDefultSchedule(_day,_month,_year){
    const newSchedule = new Schedule({
        scheduleId: new ObjectId(),
        day: _day,
        month: _month,
        year: _year,
        workingHours: {
            startTime: '09:00',
            endTime: '18:00'
        },
        takenHours: {
            appointments: [{
                startAppointment: new Date().setHours(9, 0, 0),
                duration: 0,
                appointmentId: new ObjectId()
            }]
        }
    });
    return newSchedule;
}
function createNewAppointmentScheduleFormat(newAppFormatedStartTime,duration, appointmentId){
    const newAppointment = {
        startAppointment: newAppFormatedStartTime,
        duration: duration ,
        appointmentId: appointmentId
    };
    return newAppointment;
}
