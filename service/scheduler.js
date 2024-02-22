const schedule = require('../models/schedule.model');
const appointmentModel = require('../models/appointment.model');
module.exports = {
    async getStartAndEndTimeFromUser(req, res) {
        try { 
            const { date, endTime, firstName, lastName, startTime, type, userName } = req.body;

            // Assuming AppointmentModel is your Mongoose model
            const newAppointment = new AppointmentModel({
                date,
                endTime,
                firstName,
                lastName,
                startTime,
                type,
                userName
            });
    
            /*
            const startTime = newAppointment.time;
            const type = newAppointment.type;
            const duration = calcType(startTime, type);//take type 
            if (startTime < schedule.workingHours.startTime || startTime + duration > schedule.workingHours.endTime) {
                throw new Error("Can't set appointment");
            } else {
                const takenHours = schedule.takenHours.appointments;
                takenHours.sort(); // Assuming appointments is an array of times that can be sorted
                
                let canSetAppointment = true;
    
                takenHours.forEach(takenTime => { 
                    const endTime = startTime + duration;
                    if (startTime <= takenTime && endTime >= takenTime) {
                        canSetAppointment = false;
                        return;
                    }
                });
    
                if (canSetAppointment) {
                    takenHours.push(startTime, endTime);
                    return takenHours;
                } else {
                    throw new Error("Can't set appointment");
                }
            }
            */
        } catch (error) {
            console.error('Error setting appointment:', error);
            throw error;
        }

    },
}
/*}
async function getStartAndEndTimeFromUser(newAppointment) {
    try {
        
        const startTime = newAppointment.time;
        const type = newAppointment.type;
        const duration = calcType(startTime, type);//take type 

        if (startTime < schedule.workingHours.startTime || startTime + duration > schedule.workingHours.endTime) {
            throw new Error("Can't set appointment");
        } else {
            const takenHours = schedule.takenHours.appointments;
            takenHours.sort(); // Assuming appointments is an array of times that can be sorted
            
            let canSetAppointment = true;

            takenHours.forEach(takenTime => { 
                const endTime = startTime + duration;
                if (startTime <= takenTime && endTime >= takenTime) {
                    canSetAppointment = false;
                    return;
                }
            });

            if (canSetAppointment) {
                takenHours.push(startTime, endTime);
                return takenHours;
            } else {
                throw new Error("Can't set appointment");
            }
        }
    } catch (error) {
        console.error('Error setting appointment:', error);
        throw error;
    }
}

module.exports = getStartAndEndTimeFromUser;
*/