const MongoStorage = require('../db/mongo.storage');
class AppointmentRepository extends MongoStorage {
    constructor(mod) {
        super(mod); 
        this.Model = mod;
        this.updateAppointmentValue = this.updateAppointmentValue.bind(this);
        this.findByUserName = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findAppointmentByAppId = this.findAppointmentByAppId.bind(this);
        this.findByStatus = this.findByStatus.bind(this);
        this.findByStartTime = this.findByStartTime.bind(this);
        this.findByIdAndDelete = this.findByIdAndDelete.bind(this);
        this.createNewAppointment = this.createNewAppointment.bind(this);
    }

    async updateAppointmentValue(appointmentValue, key, value) {
        try {
            const appointment = await this.Model.findById(appointmentValue);
            if (!appointment) {
                throw new Error('Appointment not found');
            }
            appointment[key] = value;
            const updatedAppointment = await appointment.save();
            return updatedAppointment;
        } catch (error) {
            throw new Error(`Error updating appointment value: ${error.message}`);
        }
    }
    async findByUserName(userName) {
        try {
            const appointments = await this.findByAttribute('userName', userName);
            return appointments;
        } catch (error) {
            throw new Error(`Error retrieving appointments by userId: ${error.message}`);
        }
    }
    async findAll()
    {
        try {
            const appointments = await this.find();
            return appointments;
        } catch (error) {
            throw new Error(`Error retrieving appointments: ${error.message}`);
        }
    }  
    async findAppointmentByAppId(appointmentId) {
        try{
            const appointment = await this.retrieve(appointmentId);
            return appointment;
        }catch(error){
            throw new Error(`Error retrieving appointments: ${error.message}`);
        }
    }
    async findByStatus(status) {
        try {
            const appointments = await this.findByAttribute('status', status);
            return appointments;
        } catch (error) {
            throw new Error(`Error retrieving appointments by status: ${error.message}`);
        }
    }
    async findByStartTime(startTime) {
        try {
            const appointments = await this.findByAttribute('startTime', startTime);
            return appointments;
        } catch (error) {
            throw new Error(`Error retrieving appointments by startTime: ${error.message}`);
        }
    }
    async findByIdAndDelete(appointmentId) {
        try {
            const deletedAppointment = await this.Model.findByIdAndDelete(appointmentId);
            return deletedAppointment;
        } catch (error) {
            throw new Error(`Error deleting appointment: ${error.message}`);
        }
    }
    async createNewAppointment(appointmentData) {
        try {
            const newAppointment = await this.Model.create(appointmentData);
            return newAppointment;
        } catch (error) {
            throw new Error(`Error creating appointment: ${error.message}`);
        }
    }
}

module.exports = AppointmentRepository;
