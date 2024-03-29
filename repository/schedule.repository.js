const MongoStorage = require('../db/mongo.storage');

class ScheduleRepository extends MongoStorage {
    constructor(mod) {
        super(mod); 
        this.Model = mod;
        this.updateScheduleValue = this.updateScheduleValue.bind(this);
        this.findByUserName = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findByDayMonthYear = this.findByDayMonthYear.bind(this); 
        this.updateScheduleValueTwoKeys = this.updateScheduleValueTwoKeys.bind(this);
        this.removeAndUpdateAppointment = this .removeAndUpdateAppointment.bind(this);
        this.removeAppointmentFromScheduleByAttributeAppointmentId = this.removeAppointmentFromScheduleByAttributeAppointmentId.bind(this);
    }

    async updateScheduleValueTwoKeys(scheduleId, key, key2, value) {
        try {
            let schedule = await this.Model.findById(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            schedule[key][key2] = value; 
            const updatedSchedule = await schedule.save(); 
            return updatedSchedule;
        } catch (error) {
            throw new Error(`Error updating schedule value: ${error.message}`);
        }
    }
    
    async updateScheduleValue(scheduleId, key, value) {
        try {
            const schedule = await this.Model.findById(scheduleId);
            if (!schedule) {
                throw new Error('Schedule not found');
            }
            schedule[key] = value;
            const updatedSchedule = await schedule.save();
            return updatedSchedule;
        } catch (error) {
            throw new Error(`Error updating schedule value: ${error.message}`);
        }
    }

    async findByUserName(userName) {
        try {
            const schedule = await this.findByAttribute('userName', userName);
            return schedule;
        } catch (error) {
            throw new Error(`Error retrieving schedules by userId: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const schedules = await this.find();
            return schedules;
        } catch (error) {
            throw new Error(`Error retrieving schedules: ${err.message}`);
        }
    }
    async findByDayMonthYear(day, month, year) {
        try {
            const schedule = await this.Model.findOne({ day, month, year });
            return schedule;
        } catch (error) {
            throw new Error(`Error retrieving schedules by day, month, and year: ${error.message}`);
        }
    }
    async removeAndUpdateAppointment(appointmentId) {
        try {
            const schedule = await this.Model.findOne({ "takenHours.appointments.appointmentId": appointmentId });
            if (!schedule) {
                throw new Error("Schedule not found");
            }
                schedule.takenHours.appointments = schedule.takenHours.appointments.filter(appointment => {
                return appointment.appointmentId.toString() !== appointmentId;
            });
            await schedule.save();
            console.log("Appointment removed and schedule updated successfully");
            return true;
        } catch (error) {
            console.error("Error removing appointment and updating schedule:", error);
            return false;
        }
    }
    async removeAppointmentFromScheduleByAttributeAppointmentId(appointmentId, date) {
        try {
            const day = date.getDate();
            const month = date.getMonth() + 1; // Month is zero-based, so add 1
            const year = date.getFullYear();
            const appointmentIdSRT = appointmentId.toString();
            const schedule = await this.Model.findOne({ day, month, year });
            if (!schedule) {
                console.log("Could not find schedule for date:", date);
                console.log("Appointment ID:", appointmentId);
                throw new Error("Schedule not found");
            }
            schedule.takenHours.appointments = schedule.takenHours.appointments.filter(appointment => {
                return appointment.appointmentId.toString() !== appointmentIdSRT;
            });
            console.log("Updated appointments:", schedule.takenHours.appointments);
            await schedule.save();
            return true;
        } catch (error) {
            console.error("Error removing appointment from schedule:", error);
            return false;
        }
    }
            
    
}

module.exports = ScheduleRepository;
