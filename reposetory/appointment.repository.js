const mongoStorage = require('../db/mongo.storage');
class AppointmentRepository extends mongoStorage {
  constructor() {
    super("Appointment");
    this.updateAppointmentStatus = this.updateAppointmentStatus.bind(this);
    this.retrieveByUuid = this.retrieveByUuid.bind(this);
  }

  async updateAppointmentStatus(id, newStatus) {
    return await this.update(id, { state: newStatus });
  }

  async retrieveByUuid(uuid) {
    try {
      let attribute = await this.findByAttribute("appointmentId", uuid);
      console.log(attribute);
      return attribute;
    } catch (error) {
      console.error("Error retrieving attribute by UUID:", error);
      throw error;
    }
  }
}
module.exports = new AppointmentRepository();
