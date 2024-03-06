/envirment config/
require('dotenv').config({ path: './.env' });
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Schedule = require('./models/schedule.model');
const nodemailer = require('nodemailer');
const rateLimit = require("express-rate-limit");


/APIs/
const profileRouter = require('./routers/profileRouter');

const fileLoaderRouter = require('./routers/fileLoaderRouter');
const loginRouter = require('./routers/logInRouter');
const appointmentRouter = require('./routers/appointmentRouter');
const userRouter = require('./routers/userRouter');
// const messegeReplayRouter = require('./routers/messegeReplayRouter');
// const messegeSentRouter = require('./routers/messegeSentRouter');
const scheduleRouter = require('./routers/scheduleRouter');
const schedulerRouter = require('./routers/schedulerRouter');
const clientRouter = require('./routers/clientRouter');
const MongoStorage = require('./db/mongo.storage');
/inintialize environment exucting/
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT ;
app.use('/', fileLoaderRouter);
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static(path.join(__dirname, 'frontend'))); 
/inintialize Routers/
app.use('/login', loginRouter);
app.use('/appointment', appointmentRouter);
app.use('/client', clientRouter);
app.use('/profile',profileRouter);
app.use('/user', userRouter);
// app.use("/messegeReplay",messegeReplayRouter);
// app.use("/messegeSent",messegeSentRouter);
app.use("/schedule",scheduleRouter);
app.use('/scheduler', schedulerRouter);
/Mongo connectig/
const mongoStorageInstance = new MongoStorage();
mongoStorageInstance.connect()
    .then(() => {
     
     })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
/server/
const server = app.listen(port, () => {
    console.log("Server listening on port:", port);
});


// Now you can use the Schedule model to create new instances



// create application/json parser




//  express limiter for limiting the requests
app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)

const limiter = rateLimit({
    windowMs: 25 * 60 * 1000, // 20 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});

// use limiter only for contact route
app.use("/contact", limiter);
app.use(express.static('public'))



// middleware for verifying the data posted
const validator = (req, res, next) => {
    // give error on posting different data
    if (!req.body) return res.sendStatus(400)

    const emailRex = /(\w+)\@(\w+)\.[a-zA-Z]/g;
    let parsedObj = req.body; 

    // make a function to send status as a json
    const sendStatus = (status) => {
        res.json({
            "status": status
        })
    }

    // check if the object has name email & message property
    if (parsedObj.name && parsedObj.email && parsedObj.message) {

        let testEmail = emailRex.test(parsedObj.email); //will return true or false

        // get length of parsed objects
        let emailLength = parsedObj.email.length;
        let nameLength = parsedObj.name.length;
        let msgLength = parsedObj.message.length;

        // check for email format
        if (!testEmail) {
            sendStatus("Incorrect Email")

            // check for the lengths to limit size
        } else if (testEmail && emailLength < 50 && nameLength < 30 && msgLength < 600) {

            sendEmail(parsedObj, sendStatus);

        } else {
            // if user is trying something bigger or any other problem
            sendStatus("something really bad happened 😵");

        }

    } else {
        // if request is not having 3 objects defined above
        sendStatus("Don't mess it up 🖕")
    }
    console.log("middelware ran");

    next()
}

app.use('/contact', validator);
// telling express to use the validator on contact route only


// just setup route nothing much to add here
app.post('/contact', (req, res) => {
    // console.log(req.body);
    
})

// setup get rout for form
app.get('/service/script.js', (req, res) => {
    // Set the correct MIME type for JavaScript files
    res.set('Content-Type', 'application/javascript');
    
    // Send the JavaScript file
    res.sendFile(path.join(__dirname, '/service/script.js'));
});

const sendEmail = (parsedObj, sendStatus) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "shiramar0401@gmail.com", // 
            pass: "ioui dwsl mshd gnal"

        }
    })

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"CreativeShi " <shiramar0401@gmail.com>', // sender address
        to: 'shiramar0401@gmail.com', // list of receivers
        subject: 'Msg From Website', // Subject line
        text: parsedObj.name + " " + parsedObj.email + " is saying " + parsedObj.message, // plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        sendStatus("Message Sent");
        // send status of message sent if email is send

    });

}