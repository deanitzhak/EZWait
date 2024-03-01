const domain = `https://ezwait.onrender.com`;
export const APIpaths = {
    /*user login */
    getUserData: domain + "/user/getUserData",
    logIn: domain + "/login/logIn",
    /*appointment*/
    allAppointment: domain + "/api/appointment/allAppointment",
    findAllByUserName: domain + "/appointment/findAllByUserName",
    findAppointmentByAppId: domain + "/appointment/findAppointmentByAppId",
    findAllAppointmentByStatus: domain + "/appointment/findAllAppointmentByStatus",
    findAppointmentByStartTime: domain + "/appointment/findAppointmentByStartTime",
    findAppointmentByIdAndDelete: domain + "/appointment/findAppointmentByIdAndDelete",
    submitNewAppointment : domain + "/appointment/submitNewAppointment",
    updateAppointmentStatus : domain + "/appointment/updateAppointmentStatus",
    updateAppointment : domain + "/appointment/updateAppointment",
    /*clientRouter*/
    allClient : domain + "/client/allClient",
    findAllByUserName : domain + "/client/findAllByUserName",
    findClientByAppId : domain + "/client/findClientByAppId",
    findAllClientByStatus : domain + "/client/findAllClientByStatus",
    findClientByIdAndDelete : domain + "/client/findClientByIdAndDelete",
    submitNewClient : domain + "/client/submitNewClient",
    updateClientStatus : domain + "/client/updateClientStatus",
    /*file loader*/
    signInPage: domain + "/signInPage", 
    appointmentPage: domain + "/appointmentPage",
    /*AllSchedule*/ 
    AllSchedule: domain + "/schedule/AllSchedule",
    /*schedulerRouter*/
    scheduleNewAppointment : domain + "/scheduler/scheduleNewAppointment",
    reScheduleNewAppointment : domain + "/scheduler/reScheduleNewAppointment",
    cancelAppointmentById : domain + "/scheduler/cancelAppointmentById",
    /*
    missing routers:
    massegeReplayRouter
    massegeSentRouter
    */
    domain:domain,
};
