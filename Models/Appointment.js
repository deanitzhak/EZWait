const Type = {
    MEETING: 'Meeting',
    APPOINTMENT: 'Appointment',
    OTHER: 'Other'
  };
  
  const State = {
    PENDING: 'Pending',
    CONFIRMED: 'Confirmed',
    CANCELED: 'Canceled'
  };
  
  class Appointment {
    constructor(appointmentId, userName, firstName, lastName, startTime, endTime, type, state, timeStamp) {
      this.appointmentId = appointmentId;
      this.userName = userName;
      this.firstName = firstName;
      this.lastName = lastName;
      this.startTime = startTime;
      this.endTime = endTime;
      this.type = type;
      this.state = state;
      this.timeStamp = timeStamp;
    }
  
    // Getter methods
    getAppointmentId = () => this.appointmentId;
    getUserName = () => this.userName;
    getFirstName = () => this.firstName;
    getLastName = () => this.lastName;
    getStartTime = () => this.startTime;
    getEndTime = () => this.endTime;
    getType = () => this.type;
    getState = () => this.state;
    getTimeStamp = () => this.timeStamp;
  
    // Setter methods
    setAppointmentId = newId => {
      this.appointmentId = newId;
    };
  
    setUserName = newUserName => {
      this.userName = newUserName;
    };
  
    setFirstName = newFirstName => {
      this.firstName = newFirstName;
    };
  
    setLastName = newLastName => {
      this.lastName = newLastName;
    };
  
    setStartTime = newStartTime => {
      this.startTime = newStartTime;
    };
  
    setEndTime = newEndTime => {
      this.endTime = newEndTime;
    };
  
    setType = newType => {
      this.type = newType;
    };
  
    setState = newState => {
      this.state = newState;
    };
  
    setTimeStamp = newTimeStamp => {
      this.timeStamp = newTimeStamp;
    };
  }
  
  module.exports = Appointment;
  