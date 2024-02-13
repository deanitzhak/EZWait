const ProfileRepository = require('../reposetory/profile.repository');
const User = require('../models/profile.model');

module.exports = {
    checkUserAdmin: (req, res) => {
        proRepo = new ProfileRepository(User);
        proRepo.findOne({'userName': req.body.userName, 'password': req.body.password})
        .then(profiles => {
            if( profiles != null){
                console.log("Retrieved profiles:", profiles);
                res.send("The user exists");
            }else{
                res.send("null:");
            }
            
        })
        .catch(error => {
            res.send("Error retrieving profiles:", error);
        });
    

    },
    checkUserClient: (req, res) => {
        // Implementation for checking user as a client
    }
};
