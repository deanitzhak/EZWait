/*module.exports = new (class AppointmentRepository extends MongoStorage {
    constructor() {
        super("Appointment");
        this.incAttributeReqCount = this.incAttributeReqCount.bind(this);
    }
    async updateAppointmentStatus(id, newStatus) {
        return await this.update(id, {status: newStatus}).populate({path: 'appointment'});
    }
    retrieveByUuid(uuid) {
        return this.findByAttribute("uuid", uuid);
      }*/