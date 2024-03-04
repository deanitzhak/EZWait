const mongoose = require('mongoose');
const profileModel = require('../models/profile.model');

const EnumType = {
    VALUE1: 'user',
    VALUE2: 'admin',
};

async function createNewProfile(newProfileJSON) {
    const profileId = new mongoose.Types.ObjectId();
    
    let userType = EnumType.VALUE1; // Default to 'user'
    if (newProfileJSON.Profile.email === 'shiramar0401@gmail.com') {
        userType = EnumType.VALUE2; // Set to 'admin' if the email matches
    }// Generate a new ObjectId for clientId
    const newProfile = new profileModel({
        profileId: profileId,
        userName: newProfileJSON.Profile.userName,
        firstName: newProfileJSON.Profile.firstName,
        lastName: newProfileJSON.Profile.lastName,
        email: newProfileJSON.Profile.email,
        password: newProfileJSON.Profile.password,
        type: userType,
        createdAt: new Date(),
    
            
    });
    console.log("newProfile -> ", newProfile);
    console.log("newClient -> ", newProfileJSON);
    return newProfile;
}
module.exports = {
    createNewProfile
};