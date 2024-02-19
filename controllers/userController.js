const globalData = require('../models/myUser.singleton');
module.exports = {
    getUserData: (req, res) => {
        const myUser = globalData.getData("myUser");
        res.send(myUser);
    },
};
