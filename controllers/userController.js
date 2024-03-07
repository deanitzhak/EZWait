const globalData = require('../models/myUser.singleton');
module.exports = {
    getUserData: (req, res) => {
        const myUser = globalData.getData("myUser");
          res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
        res.send(myUser);
    },
};
