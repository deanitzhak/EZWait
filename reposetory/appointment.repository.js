const MongoStorage = require('../db/mongo.storage');
const { appointmentModel } = require('../models/appointment.model');

class AppointmentRepository extends MongoStorage {
    constructor() {
        super(); // Call the super constructor before accessing `this`

        // Assign the appointmentModel to the Model property
        this.Model = appointmentModel;
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
