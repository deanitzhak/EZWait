// index.js
const MongoStorage = require('../db/mongo.storage').getInstance;
const AppointmentRepository = require('../reposetory/appointment.repository');

// Connect to MongoDB
const mongoStorageInstance = MongoStorage();
mongoStorageInstance.connect(() => {
    // Connected, now you can use the repository
    const appointmentRepo = new AppointmentRepository();

    // Example usage
    appointmentRepo.retrieveByUuid('some-uuid')
        .then(result => console.log('Appointment by UUID:', result))
        .catch(error => console.error('Error retrieving appointment:', error))
        .finally(() => {
            // Optionally, close the MongoDB connection when done
            mongoose.connection.close();
        });
});
