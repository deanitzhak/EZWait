const ProfileRepository = require('../repository/profile.repository');
const User = require('../models/profile.model');
const globalData = require('../models/myUser.singleton');
module.exports = {
    checkUserExist: (req, res) => {
        proRepo = new ProfileRepository(User);
        const token = req.body.token;
        proRepo.findOne({'userName': req.body.userName, 'password': req.body.password})
        .then(profiles => {
            if( profiles != null){
                globalData.setData('myUser', profiles);
                globalData.setData('token', token);
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
