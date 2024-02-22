const scheduleModel = require('../models/schedule.model');
const appointmentModel = require('../models/appointment.model');


const EnumType = {
    VALUE1: 'value1',
    VALUE2: 'value2',
    VALUE3: 'value3'
};
module.exports = {
    async getStartAndEndTimeFromUser(req, res) {
        try {
            const schedule = new scheduleModel();
            const newAppointmentObj = JSON.parse(req.query.newAppointment);
            const startTime = newAppointmentObj.Appointment.startTime; // Access startTime from Appointment
            const type = newAppointmentObj.Appointment.type;
            const endTime = calculateDuration(startTime, type); // Take type
    
            // Now you can use startTime, type, and endTime as needed
    
            console.log("startTime:", startTime);
            console.log("type:", type);
            console.log("endTime:", endTime);
            console.log("schedule", scheduleModel);
    
            if (startTime < schedule.workingHours.type.startTime || endTime > schedule.workingHours.type.endTime) {
                throw new Error("Can't set appointment");
            } else {
                const takenHours = schedule.takenHours.appointments;
                takenHours.sort(); // Assuming appointments is an array of times that can be sorted
                
                let canSetAppointment = true;
    
                takenHours.forEach(takenTime => { 
                  
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
    console.error('Error processing appointment data:', error);
    // Send an error response
    res.status(500).json({ error: 'Internal Server Error' });
}
}

};


function calculateDuration(type, startTime) {
    const duration = getDurationByType(type);
    console.log(duration);
    const endTime = new Date(startTime);
    endTime.setHours(endTime.getHours() + duration);
    return endTime;
}

function getDurationByType(type) {
    switch (type) {
        case EnumType.VALUE1:
            return 2; // 2 hours
        case EnumType.VALUE2:
        case EnumType.VALUE3:
            return 1; // 1 hour
        default:
            return 0; // Default duration
    }
}
// // Access each field of the Appointment object
// const userName = newAppointmentObj.Appointment.userName;
// const firstName = newAppointmentObj.Appointment.firstName;
// const lastName = newAppointmentObj.Appointment.lastName;
// const type = newAppointmentObj.Appointment.type;
// const date = newAppointmentObj.Appointment.date;
// const startTime = newAppointmentObj.Appointment.startTime;
// const endTime = newAppointmentObj.Appointment.endTime;

// Now you can use these variables as needed
// console.log("userName:", userName);
// console.log("firstName:", firstName);
// console.log("lastName:", lastName);
// console.log("type:", type);
// console.log("date:", date);
// console.log("startTime:", startTime);
// console.log("endTime:", endTime);

            // Send a success response
           // res.status(200).json({ message: 'Appointment saved successfully', appointment: savedAppointment });




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