const MongoStorage = require('../db/mongo.storage');
const { appointmentModel } = require('../models/appointment.model');

class AppointmentRepository extends MongoStorage {
    constructor() {
        super(); // Call the super constructor before accessing `this`
        // Assign the appointmentModel to the Model property
        this.Model = appointmentModel;

        // Bind methods to ensure proper context
        this.updateAppointmentValue = this.updateAppointmentValue.bind(this);
        this.findByUserId = this.findByUserId.bind(this);
        this.findAll = this.findAll.bind(this);
    }

    async updateAppointmentValue(appointmentId, key, value) {
        try {
            // Find the appointment by ID
            const appointment = await this.Model.findById(appointmentId);

            if (!appointment) {
                throw new Error('Appointment not found');
            }

            // Update the value of the specified key
            appointment[key] = value;

            // Save the updated appointment
            const updatedAppointment = await appointment.save();
            return updatedAppointment;
        } catch (error) {
            throw new Error(`Error updating appointment value: ${error.message}`);
        }
    }

    async findByUserId(userName) {
        try {
            // Use the find method inherited from MongoStorage to fetch appointments by userId
            const appointments = await this.findByAttribute('userName', userName);
            return appointments;
        } catch (error) {
            throw new Error(`Error retrieving appointments by userId: ${error.message}`);
        }
    }

    async findAll() {
        try {
            // Use the find method inherited from MongoStorage to fetch all appointments
            const appointments = await this.find();
            return appointments;
        } catch (error) {
            throw new Error(`Error retrieving appointments: ${error.message}`);
        }
    }
    // Other repository methods...
}

module.exports = AppointmentRepository;
