const path = require("path");

module.exports = {
    signInPage: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/signIn.html'));
    },
    profilePage:  (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/profilePage.html'));

    }  
}