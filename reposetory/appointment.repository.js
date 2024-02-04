const mongoStorage = require('./MongoStorage'); 
class appointmentRepository extends mongoStorage {
    constructor() {
        super("appointment");
        this.updateAppointmentStatus = this.updateAppointmentStatus.bind(this);
        this.retrieveByUuid = this.retrieveByUuid.bind(this);
    }

    async updateAppointmentStatus(id, newStatus) {
        return await this.update(id, { state: newStatus }).populate({ path: 'appointment' });
    }

    async retrieveByUuid(uuid) {
        return this.findByAttribute("uuid", uuid);
    }
}
module.exports = new appointmentRepository();