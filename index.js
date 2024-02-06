const express = require('express');
const bodyParser = require('body-parser');
const MongoStorage = require('./db/mongo.storage');  // Note: Use 'MongoStorage' instead of 'mongoStorage'
require('dotenv').config({ path: './.env' });
/*----Testing-----*/
const { profileModel } = require("./models/profile.model");
const { ObjectId } = require("mongodb");
/*----Testing-----*/
const port = process.env.PORT ;
const app = express();
// init file 
const mongoStorageInstance = new MongoStorage;
mongoStorageInstance.connect()
    .then(() => {
        console.log("Connected to MongoDB");
        /*----Testing-----*/
        mongoStorageInstance.create(createDeanProfoile());
        //createDeanProfoile();
        /*----Testing-----*/
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        // Handle connection error
    });
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
// Placeholder run function, you need to define it according to your requirements.
async function run() {
  console.log('Run function is called.');
}
run().catch(console.dir);
/*----Testing-----*/
function createDeanProfoile(){
  const newProfile = new profileModel({
    userId: new ObjectId(),
    userName: "NaveM",
    firstName: "Nave",
    lastName: "Maymon",
    email: "ezwaitport@gmail.com",
    password: "Test123",
    status: true,
    createdAt: Date.now(), // Assign current date and time
    cancelCount: 0 // Ensure cancelCount is properly initialized
});
  return newProfile;
}
