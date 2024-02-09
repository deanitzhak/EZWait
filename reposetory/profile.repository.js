const MongoStorage = require('../db/mongo.storage');
const { profileModel } = require('../models/profile.model');

class ProfileRepository extends MongoStorage {
    constructor() {
        super(); // Call the super constructor before accessing `this`
        this.Model = profileModel;

        // Bind methods to ensure proper context
        this.updateAppointmentValue = this.updateAppointmentValue.bind(this);
        this.findByUserId = this.findByUserId.bind(this);
        this.findAll = this.findAll.bind(this);
    }

    async updateAppointmentValue(profileId, key, value) {
        try {
            // Find the appointment by ID
            const profile = await this.Model.findById(profileId);

            if (!profile) {
                throw new Error('Appointment not found');
            }

            // Update the value of the specified key
            profile[key] = value;

            // Save the updated appointment
            const updatedAppointment = await profile.save();
            return updatedAppointment;
        } catch (error) {
            throw new Error(`Error updating appointment value: ${error.message}`);
        }
    }

    async findByUserName(userName) {
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

module.exports = ProfileRepository;
