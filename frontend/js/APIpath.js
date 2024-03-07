const domain = `https://ezwait.onrender.com`;

 const APIpaths = {
  getUserData: domain + "/user/getUserData",
  updateAppointmentStatus: domain + "/appointment/updateAppointmentStatus",
  findAllAppointmentByStatus: domain + "/appointment/findAllAppointmentByStatus",
  findAllAppointmentByDate: domain + "/appointment/findAllAppointmentByDate",
  scheduleNewAppointment: domain + "/scheduler/scheduleNewAppointment",
  scheduleNewAppointment: domain + "/scheduler/scheduleNewAppointment",
  reScheduleNewAppointment: domain + "/scheduler/reScheduleNewAppointment",
  submitNewAppointment: domain + "/appointment/submitNewAppointment",
  cancelAppointmentById: domain + "/scheduler/cancelAppointmentById",
  updateAppointment: domain + "/appointment/updateAppointment",
  findAllByUserName: domain + "/client/findAllByUserName",
  allClient: domain + "/client/allClient",
  submitNewProfile: domain + "/profile/submitNewProfile",
  logIn: domain + "/login/logIn",

  domain: domain,
};

module.exports = APIpaths;
