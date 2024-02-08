const express = require('express');
const bodyParser = require('body-parser');
const MongoStorage = require('./db/mongo.storage');  // Note: Use 'MongoStorage' instead of 'mongoStorage'
require('dotenv').config({ path: './.env' });
/*----Testing-----*/
const { appointmentModel } = require("./models/appointment.model");
const { profileModel } = require("./models/profile.model");
const { scheduleModel} = require("./models/schedule.model");
const { messegeReplayModel} = require("./models/messegeReplay.model");
const { messegeSentModel} = require("./models/messegeSent.model");
const { ObjectId } = require("mongodb");
const AppointmentRepository = require('./reposetory/appointment.repository');
/*----Testing-----*/
const port = process.env.PORT ;
const app = express();
// init file 
const mongoStorageInstance = new MongoStorage;
mongoStorageInstance.connect()
    .then(() => {
        console.log("Connected to MongoDB");
        /*----Testing-----*/
        //mongoStorageInstance.create(createDeanProfoile());
        //mongoStorageInstance.create(createNewSchedule());
        //mongoStorageInstance.create(createMessegeReplay());
        //mongoStorageInstance.create(createMessegeSent());
        //mongoStorageInstance.create(createNewAppointment());
        //testFindAllAppRepo();
        //testFindByUserIdAppRepo("NaveM");
        //testUpdateAppointmentValue("65c3bbba9a1094dc8d3f54ab","userName","Shirrrrr");        /*----Testing-----*/
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        // Handle connection error
    });
runPort();
// Placeholder run function, you need to define it according to your requirements.
async function run() {
  console.log('Run function is called.');
}
run().catch(console.dir);
/*----Testing-----*/
function runPort(){
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('Frontend'));
  app.use('/js', express.static(__dirname + 'public/js'));
  app.use('/css', express.static(__dirname + 'public/css'));
  app.use('/images', express.static(__dirname + 'public/images'));
  app.use(express.urlencoded({ extended: false }));
  app.get('', (req, res) => {
    res.sendFile(__dirname + '/Frontend/landing.html');
  });
  app.listen(port, () => console.log('Listening on port', port));
}
/*Schedule*/ 
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
/*Pfofile*/
function createDeanProfoile(){
  const newProfile = new profileModel({
    userId: new ObjectId(),
    userName: "ShirA",
    firstName: "Shir",
    lastName: "Amar",
    email: "ezwaitport@gmail.com",
    password: "Test123",
    status: true,
    createdAt: Date.now(), // Assign current date and time
    cancelCount: 0 // Ensure cancelCount is properly initialized
});
  return newProfile;
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
function testFindByUserIdAppRepo(userName){
  const appointmentRepo = new AppointmentRepository(); 
  appointmentRepo.findByUserId(userName)
    .then(appointments => {
      console.log(appointments);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
async function testUpdateAppointmentValue(appointmentId, key, value) {
  try {
    const appointmentRepo = new AppointmentRepository();
    const updatedAppointment = await appointmentRepo.updateAppointmentValue(appointmentId, key, value);
    console.log('Updated Appointment:', updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment value:', error.message);
  }
}
