const path = require("path");

module.exports = {
    signInPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/signIn.html'));
    },
    appointmentPage:  (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/appointment.html'));

    }  
}