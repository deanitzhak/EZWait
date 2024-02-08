/*
const {newMail, sendMailAfterTime} = require("../services/mailer");
const mailService = require("../DAL/emailsDAL");
const errorHandler = require("./errorController");

async function getEmails(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    try {
        res.json(await mailService.getAllSentEmails());
    } catch (err) {
        return errorHandler(req, res, err);
    }
}

async function getScheduledEmails(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200);
    try {
        res.json(await mailService.getAllFutureEmails());
    } catch (err) {
        return errorHandler(req, res, err);
    }
}

async function totalSentEmails(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", " text/plain");
    res.status(200);
    try {
        res.send(${await mailService.getNumOfSentEmails()});
    } catch (err) {
        return errorHandler(req, res, err);
    }
}

async function totalEmailsToSend(req, res) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", " text/plain");
    res.status(200);
    try {
        res.send(${await mailService.getNumOfEmailsToSend()});
    } catch (err) {
        return errorHandler(req, res);
    }
}

async function sendMail(req, res) {
    try {
        const {mail, isScheduled, timeToSend} = req.body;
        await newMail(mail, isScheduled, timeToSend);
        res.status(200);
    } catch (err) {
        return errorHandler(req, res, err);
    }
}

async function timedOutRegisterMail(req, res) {
    try {
        const {mail, isCompleted} = req.body;
        if (isCompleted === false) {
            await sendMailAfterTime(mail, isCompleted);
            res.status(200);
            res.send(<h1>Send Email Successfully </h1>);
        } else {
            res.send(
                <h1> this user has successfully completed the registration process </h1>
            );
        }
    } catch (err) {
        return errorHandler(req, res, err);
    }
}

module.exports = {
    getEmails,
    getScheduledEmails,
    totalSentEmails,
    totalEmailsToSend,
    sendMail,
    timedOutRegisterMail,
};
*/