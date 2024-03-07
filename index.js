/envirment config/
const URL = process.env.URL;
const cors = require('cors');

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
const {appointmentStatusUpdate} = require("./frontend/js/cron.job");
const MongoStorage = require('./db/mongo.storage');
const { env } = require('process');
appointmentStatusUpdate();
/*inintialize environment exucting*/
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
app.use(cors());
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

app.enable("trust proxy"); 

// Create a limiter for limiting requests
const limiter = rateLimit({
    windowMs: 25 * 60 * 1000, // 20 minutes
    max: 10 // limit each IP to 10 requests per windowMs
});

// Use limiter only for the contact route
app.use("/contact", limiter);
app.use(express.static('public'));
app.use(bodyParser.json());

// Middleware for validating the data posted
const validator = (req, res, next) => {
    if (!req.body) return res.sendStatus(400);

    const emailRegex = /(\w+)\@(\w+)\.[a-zA-Z]/g;
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.json({ status: "Incomplete data" });
    }

    const isEmailValid = emailRegex.test(email);
    const nameLength = name.length;
    const emailLength = email.length;
    const msgLength = message.length;

    if (!isEmailValid || emailLength >= 50 || nameLength >= 30 || msgLength >= 600) {
        return res.json({ status: "Invalid data" });
    }

    next();
};

// Endpoint for sending emails
app.post('/send-email', (req, res) => {
    const { senderName, senderEmail, message, phone } = req.body; // Destructure parameters from the request body
    sendEmail(senderName, senderEmail, message, phone)
        .then(() => {
            res.json({ status: 'success' });
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            res.status(500).json({ status: 'error', message: 'Failed to send email' });
        });
});

// Use the validator middleware for the contact route only
app.use('/contact', validator);

// Route for handling form submissions
app.post('/contact', (req, res) => {
    // Handle form submission
});

// Route for serving JavaScript file
app.get('/service/script.js', (req, res) => {
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, '/service/script.js'));
});


// Function to send email
const sendEmail = (senderName, senderEmail, message,phone) => {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            host: env.HOST_MAIL,
            port: env.PORT_MAIL,
            secure: true,
            auth: {
                user: env.USER_MAIL,
                pass: env.USER_PASSWORD
            }
        });

        let mailOptions = {
            from: `"CreativeShi" <${senderEmail}>`,
            to: env.TO_SEND_MAIL,
            subject: 'Ezwait constact us form',
            text: `${senderName} (${senderEmail}) is saying: ${message} phone : ${phone}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
};
