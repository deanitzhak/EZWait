/*envirment config*/
require('dotenv').config({ path: './.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
/*APIs*/
const fileLoaderRouter = require('./routers/fileLoaderRouter');
const loginRouter = require('./routers/logInRouter');
const appointmentRouter = require('./routers/appointmentRouter');
const userRouter = require('./routers/userRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const schedulerRouter = require('./routers/schedulerRouter');
const clientRouter = require('./routers/clientRouter');
const MongoStorage = require('./db/mongo.storage');
/*inintialize environment exucting*/
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT ;
app.use('/', fileLoaderRouter);
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'frontend'))); 
/*inintialize Routers*/
app.use('/login', loginRouter);
app.use('/appointment', appointmentRouter);
app.use('/client', clientRouter);
app.use('/user', userRouter);
app.use("/schedule",scheduleRouter);
app.use('/scheduler', schedulerRouter);
/*Mongo connectig*/
const mongoStorageInstance = new MongoStorage();
mongoStorageInstance.connect()
    .then(() => {
     
     })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
/*server*/
const server = app.listen(port, () => {
    console.log("Server listening on port:", port);
});
/**/
/*
const { ObjectId } = require("mongodb");
const Profile = require("./models/profile.model");
const userTypeEnum = ['user', 'admin'];

async function createProfiles() {
    try {
        const profilesData = new Profile({
            userId: new ObjectId(),
            userName: "NaveM",
            firstName: "Nave",
            lastName: "Mayimon",
            email: "Ezwait@gmail.com",
            password: "111111",
            status: true,
            type: userTypeEnum[2], 
            createdAt: new Date(),
            cancelCount: 0
        });

        const createdProfile = await profilesData.save();
        console.log("Profile created:", createdProfile);
    } catch (error) {
        console.error("Error creating profile:", error);
    }
}
*/
// Call the function to create a profile
//createProfiles();

/*{ userId : new ObjectId(),userName: "DeanI", firstName: "Dean", lastName: "Itzhak",email: "Ezwait@gmail.com" , password: "111111", status:true ,type: true, createdAt: new Date(), cancelCount: 0  },
{ userId : new ObjectId(),userName: "ShirA", firstName: "Shir", lastName: "Amar",email: "Ezwait@gmail.com" , password: "111111", status:true ,type: true, createdAt: new Date(), cancelCount: 0 },
{ userId : new ObjectId(),userName: "NaveM", firstName: "Nave", lastName: "Mayimon",email: "Ezwait@gmail.com" , password: "111111", status:true ,type: true, createdAt: new Date(), cancelCount: 0  }*/
