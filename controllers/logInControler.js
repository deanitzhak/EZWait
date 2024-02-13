const ProfileRepository = require('../reposetory/profile.repository');
const User = require('../models/profile.model');
const globalData = require('../models/myUser.singleton');
module.exports = {
    checkUserExist: (req, res) => {
        proRepo = new ProfileRepository(User);
        proRepo.findOne({'userName': req.body.userName, 'password': req.body.password})
        .then(profiles => {
            if( profiles != null){
                globalData.setData('myUser', profiles);
                res.send(profiles);
            }else{
                res.send("Invalid Data");
            }
        })
        .catch(error => {
            console.log("Error : ",error);
        });
    },
};
