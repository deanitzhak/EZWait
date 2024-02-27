const ScheduleRepository = require('../repository/schedule.repository');
const Schedule = require('../models/schedule.model');
const { ObjectId } = require("mongodb");
const schedRepo = new ScheduleRepository(Schedule);
let duration;
const GMT = 2 /*need to be on global data file*/
const moment = require('moment');
const currentDate = new Date();
/*this flag is indicate if a new day is opend or not*/
let defultCreate; 
const EnumType = {
    VALUE1: '1',
    VALUE2: '2',
    VALUE3: '3'
};
module.exports = {
    async getStartAndEndTimeFromUser(req, res) {
        try {
            defultCreate = false;
            let newAppointmentObj = JSON.parse(req.query.newAppointment);
            const dateStr = newAppointmentObj.Appointment.date;
            const startTime = newAppointmentObj.Appointment.startTime; 
            const date = newAppointmentObj.Appointment.date;
            const type = newAppointmentObj.Appointment.type;
            const newAppFormatedStartTime = combainDateAndHoursToDate(startTime ,dateStr);
            const newAppFormatedEndTime = calculateDuration(startTime, type,date);
            /*get the schedule of the input day*/
            const _date = new Date(dateStr);
            let schedule = await getScheduleByDate(_date);
            const formattedEndTime = getformatedDateEndTime (newAppFormatedEndTime);
            /*if there is no appoontment so ther is no sched if the is no sech so create defult*/
            /*get the start day and the end of working hours*/
            /*cheking if the appointment is taken*/
            const validTime = checkalidTime(schedule,startTime,formattedEndTime);
            if(date < currentDate){
                throw new Error("Can't set appointment");
            }
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
            const newAppointment = {
                startAppointment: newAppFormatedStartTime,
                duration: duration ,
                appointmentId: new ObjectId()
            };
            appointments.push(newAppointment);
            appointments.sort();
            schedule.takenHours.appointments = appointments;
            if(defultCreate){
                schedule.save();
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
    async getScheduleByDayMonthYear(req, res) {
        try {
            


        } catch (error) {
            console.error('Error retrieving schedule:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};
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
function checkalidTime(schedule,startTime,formattedEndTime){
    const { startTime: defsStartTime, endTime: defEndTime } = schedule.workingHours;
    /*extract time and date for cheking if the ours time is valid*/
    if (startTime < defsStartTime || formattedEndTime > defEndTime ||(formattedEndTime >= '00:00' && formattedEndTime < '05:00')) {
        throw new Error("Can't set appointment");
    }
return true;
}
function checkTakenTime(appointments,newAppFormatedStartTime,newAppFormatedEndTime){
    appointments.forEach(takenTime => { 
        /*formated end time in schedule*/
        let endTimeFormat = new Date(takenTime.startAppointment + (takenTime.duration * (60 *60 *1000)));
        endTimeFormat = formatedDate(endTimeFormat);
        const formatedEndDate = new Date (endTimeFormat);
        let updatedtakenTime;
        /*startAppointment in schedule*/
        if(takenTime.duration == 0){                                          
             updatedtakenTime= new Date(takenTime.startAppointment.getTime());
        }else{
             updatedtakenTime= new Date(takenTime.startAppointment.getTime());
        }
        const updatedEndDate = new Date(formatedEndDate.getTime());
        /*using moment for be able to compare*/
        const newStartTime = moment(newAppFormatedStartTime);
        const newEndTime = moment(newAppFormatedEndTime);
        const takenTimeStartAppointment = moment(updatedtakenTime);
        const takenTimeEndAppointment = moment(updatedEndDate)
        /**/ 
        const isOverlap = newStartTime.isBefore(takenTimeEndAppointment) && newEndTime.isAfter(takenTimeStartAppointment);
        const CAN_BE_ACCEPTED = !isOverlap;
        if (CAN_BE_ACCEPTED) {
        } else {
            throw new Error("Appointment is taken");                   
        }
    });
    return true;
}
function getformatedDateEndTime(newAppFormatedEndTime){
    const hours = newAppFormatedEndTime.getUTCHours();
    const minutes = newAppFormatedEndTime.getUTCMinutes();
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedEndTime = `${formattedHours}:${formattedMinutes}`;
    return formattedEndTime
}
function combainDateAndHoursToDate(time,_date)
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
function getDurationByType(type) {
    switch (type) {
        case EnumType.VALUE1:
            return 2 * 60 * 60 * 1000; // 2 hours in milliseconds
        case EnumType.VALUE2:
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
                duration: 0
            }]
        }
    });
    return newSchedule;
}
function formatedDate(strDate){
    const day = strDate.getDate();
    const month = strDate.getMonth() + 1;
    const year = strDate.getFullYear();
    const hours = strDate.getHours();
    const minutes = strDate.getMinutes();
    const seconds = strDate.getSeconds();

    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.000Z`;
    return formattedDate;
}
