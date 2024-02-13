/*envirment config*/
require('dotenv').config({ path: './.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
/*API*/
const { ObjectId } = require('mongodb'); // Import ObjectId from MongoDB Node.js driver
const fileLoaderRouter = require('./routers/fileLoaderRouter');
const loginRouter = require('./routers/logInRouter');
const appointmentRouter = require('./routers/appointmentRouter');
const userRouter = require('./routers/userRouter');
const MongoStorage = require('./db/mongo.storage');
/*inintialize environment exucting*/
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT ;
app.use('/', fileLoaderRouter);
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'frontend'))); // Assuming frontend files are also served statically
/*inintialize Routers*/
app.use('/login', loginRouter);
app.use('/appointment', appointmentRouter);
app.use('/user', userRouter);
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
module.exports = server;
