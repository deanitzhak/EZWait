/*envirment config*/
require('dotenv').config({ path: './.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Schedule = require('./models/schedule.model');

/*APIs*/
const fileLoaderRouter = require('./routers/fileLoaderRouter');
const loginRouter = require('./routers/logInRouter');
const appointmentRouter = require('./routers/appointmentRouter');
const userRouter = require('./routers/userRouter');
const messegeReplayRouter = require('./routers/messegeReplayRouter');
const messegeSentRouter = require('./routers/messegeSentRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const schedulerRouter = require('./routers/schedulerRouter');
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
app.use('/user', userRouter);
app.use("/messegeReplay",messegeReplayRouter);
app.use("/messegeSent",messegeSentRouter);
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

// Create a Mongoose model using the schema

// Now you can use the Schedule model to create new instances
