const MongoStorage = require('../db/mongo.storage');

class AppointmentRepository extends MongoStorage {
    constructor(mod) {
        super(mod); 
        this.Model = mod;
        this.updateAppointmentValue = this.updateAppointmentValue.bind(this);
        this.findByUserName = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
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

    async findAll() {
        try {
            const appointments = await this.find();
            return appointments;
        } catch (error) {
            throw new Error(`Error retrieving appointments: ${error.message}`);
        }
    }
}

module.exports = AppointmentRepository;
