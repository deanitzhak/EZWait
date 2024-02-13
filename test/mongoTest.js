  /*----Testing-----*/
  /*
const { profileModel } = require("./models/profile.model");
const { scheduleModel } = require("./models/schedule.model");
const { messegeReplayModel } = require("./Models/messegeReplay.model");
const { messegeSentModel } = require("./models/messegeSent.model");
const { ObjectId } = require("mongodb");
const AppointmentRepository = require('./reposetory/appointment.repository');
const ProfileRepository = require('./reposetory/profile.repository');
const { UserProfile } = require('./ProfileglobalVribels');
*/
/*----Testing-----*/
        //mongoStorageInstance.create(createDeanProfoile());
        //mongoStorageInstance.create(createNewSchedule());
        //mongoStorageInstance.create(createMessegeReplay());
        //mongoStorageInstance.create(createMessegeSent());
        //mongoStorageInstance.create(createNewAppointment());
        //testFindAllAppRepo();
        //testFindByUserIdAppRepo("NaveM");
        //testUpdateAppointmentValue("65c3bbba9a1094dc8d3f54ab","userName","Shirrrrr");        /*----Testing-----*/
        //testFindAllprofileRepo();
        //testFindByUserNameProfileRepo("maymonave");
        //testPofileValueRepo("65c3b8dba13edfb95c8ad3df", "userName", "maymonave");
/*Schedule*/ 
/*
function createNewSchedule() {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    const day = currentDate.getDate(); // Get the day of the month (1-31)
    const month = currentDate.getMonth() + 1; // Get the month (0-11) and add 1 to make it (1-12)
    const year = currentDate.getFullYear(); // Get the year (e.g., 2024)
    
    // Extract the time from the current date
    const hours = currentDate.getHours(); // Get the hours (0-23)
    const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
    const seconds = currentDate.getSeconds(); // Get the seconds (0-59)
    
    // Create a new Date object for the time
    const currentTime = new Date();
    currentTime.setHours(hours, minutes, seconds); // Set the time components
    
    // Convert day, month, and year to numbers
    const dayNumber = Number(day-1);
    const monthNumber = Number(month+5);
    const yearNumber = Number(year-1);
    const newScheduleModel = new scheduleModel({
      day: dayNumber, // Set the day as a number
      month: monthNumber, // Set the month as a number
      year: yearNumber, // Set the year as a number
      time: currentTime // Set the current time
    });
  
    console.log(newScheduleModel);
    return newScheduleModel;
  }
  /*Create Replay Maessege*/
  function createMessegeReplay(){
    const newMessegeReplay = new messegeReplayModel({
      replayMessegId: new ObjectId(),
      userId: new ObjectId("65c29b4e0c3b360795068388"),
      clientId: new ObjectId("65c29b1f15a9a501dbd0e791"),
      username: "Dean",
      subject: "Meeting",
      description: "New Meeting",
      sendTime: Date.now(),
  });
    console.log(newMessegeReplay);
    return newMessegeReplay;
  }
  /*Create Sent Maessege*/
  function createMessegeSent(){
    const newMessegeSent = new messegeSentModel({
      replayMessegId: new ObjectId(),
      userId: new ObjectId("65c29b1f15a9a501dbd0e791"),
      clientId: new ObjectId("65c29b4e0c3b360795068388"),
      username: "NaveM",
      subject: "Meeting",
      description: "New Meeting",
      sendTime: Date.now(),
  });
    console.log(newMessegeSent);
    return newMessegeSent;
  }
  /*Pofile*/
  function createDeanProfoile(){
      const newProfile = new profileModel({
        userId: new ObjectId(), // Assuming you want to generate a new ObjectId for userId
        userName: 'VibIhs',
        firstName: 'Vib',
        lastName: 'Ish',
        email: 'Ish@gmail.com',
        password: '1',
        status: true,
        type: false, // Assuming this is an admin user
        createdAt: new Date(), // Assuming you want to set the current date as the createdAt value
        cancelCount: 0
    });        
    newProfile.save();
    return newProfile;
  }
  async function testFindAllprofileRepo() {
    const profileRepo = new ProfileRepository();
    // Example usage: Retrieve all profile
    profileRepo.findAll()
    .then(profiles => {
        console.log('Profiles:', profiles);
    })
    .catch(error => {
        console.error('Error retrieving profiles:', error);
    });
  }
  function testFindByUserNameProfileRepo(userName){
    const profileRepo = new ProfileRepository(); 
    profileRepo.findByUserName(userName)
      .then(profiles => {
        console.log(profiles);
        return profiles;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  async function testPofileValueRepo(profileRepo, key, value) {
    try {
      const profiletRepo = new ProfileRepository();
      const updatedProfile = await profiletRepo.updateProfileValue(profileRepo, key, value);
      console.log('Updated Profile:', updatedProfile);
    } catch (error) {
      console.error('Error updating profile value:', error.message);
    }
  }
  /*appointment*/
  function createNewAppointment(){
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    // Extract the time from the current date
    const hours = currentDate.getHours(); // Get the hours (0-23)
    const minutes = currentDate.getMinutes(); // Get the minutes (0-59)
    const seconds = currentDate.getSeconds(); // Get the seconds (0-59)
    // Create a new Date object for the time
    const currentTime = new Date();
    currentTime.setHours(hours, minutes, seconds); 
    const newAppointment = new appointmentModel({
      userId: new ObjectId(),
      userName: "NaveM",
      firstName: "Nave",
      lastName: "Maymon",
      startTime: currentTime,
      endTime: currentTime,
      type: "value1",
      status: "value3", // Assign current date and time
      timeStamp: Date.now() // Ensure cancelCount is properly initialized
  });
    console.log(newAppointment);
    return newAppointment;
  }
  async function testFindAllAppRepo() {
    const appointmentRepo = new AppointmentRepository();
    // Example usage: Retrieve all appointments
    appointmentRepo.findAll()
    .then(appointments => {
        console.log('Appointments:', appointments);
    })
    .catch(error => {
        console.error('Error retrieving appointments:', error);
    });
  }
  function testFindByUserNameAppRepo(userName){
    const appointmentRepo = new AppointmentRepository(); 
    appointmentRepo.findByUserName(userName)
      .then(appointments => {
        console.log(appointments);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  async function testUpdateAppointmentValueRepo(appointmentValue, key, value) {
    try {
      const appointmentRepo = new AppointmentRepository();
      const updatedAppointment = await appointmentRepo.updateAppointmentValue(appointmentValue, key, value);
      console.log('Updated Appointment:', updatedAppointment);
    } catch (error) {
      console.error('Error updating appointment value:', error.message);
    }
  }