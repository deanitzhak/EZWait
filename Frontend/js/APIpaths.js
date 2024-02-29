const domain = `https://ezwait.onrender.com`;


export const APIpaths = {
    getUserData: domain + "/api/user/getUserData",
    updateAppointmentStatus: domain + "/api/appointment/updateAppointmentStatus",
    findAllAppointmentByStatus: domain + "/api/appointment/findAllAppointmentByStatus?status",
    scheduleNewAppointment: domain + "/api/scheduler/scheduleNewAppointment",
    reScheduleNewAppointment: domain + "/api/scheduler/reScheduleNewAppointment",
    submitNewAppointment: domain + "/appointment/submitNewAppointment",
    cancelAppointmentById: domain + "/api/scheduler/cancelAppointmentById",
    updateAppointment: domain + "/api/appointment/updateAppointment",
    submitNewClient: domain + "/api/client/submitNewClient",
    logIn: domain + "/api/login/logIn",
  domain:domain,
};