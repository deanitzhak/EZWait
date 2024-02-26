const cron = require("node-cron");
const AppointmentRepository = require("../../repository/appointment.repository");

const appointmentStatusUpdate = () => {
    const job = cron.schedule("0 8 * * *", async () => {
        const currentTime = new Date();
        currentTime.setHours(currentTime.getHours() + 2);
        const appointments = await appointmentRepository.find();
        for (const appointment of appointments) {
            const start = new Date(appointment.duration.startTime);
            const end = new Date(appointment.duration.endTime);

            if (appointment.status === "upcoming" && currentTime >= start && currentTime <= end) {
                await AppointmentRepository.update(appointment._id, {status: "upcoming"})
            } else if (appointment.status === "upcoming" && currentTime >= end) {
                await AppointmentRepository.update(appointment._id, {status: "completed"})
            }
        }
    })
};


module.exports = {
    appointmentStatusUpdate,
}