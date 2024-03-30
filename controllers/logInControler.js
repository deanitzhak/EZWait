const ProfileRepository = require('../repository/profile.repository');
const User = require('../models/profile.model');
const globalData = require('../models/myUser.singleton');
const {PropertyNotFound} = require("../errors/NotFound.errors");
module.exports = {
    checkUserExist: (req, res) => {
        proRepo = new ProfileRepository(User);
        const token = req.body.token;
        proRepo.findOne({'userName': req.body.userName, 'password': req.body.password})
        .then(profiles => {
            if( profiles != null){
                globalData.setData('myUser', profiles);
                globalData.setData('token', token);
                if(!profiles) throw new PropertyNotFound("checkUserExist");
                res.status(200).send(profiles);
            }else{
                res.status(404).send("User not found");
            }
        })
        .catch(error => {
            res.status(404).send(error.message);
        });
    },
};
