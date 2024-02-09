const { profileModel } = require("../models/profile.model");
const { ObjectId } = require("mongodb");
const MongoStorage = require('../db/mongo.storage');  // Note: Use 'MongoStorage' instead of 'mongoStorage'
const mongoStorageInstance = new MongoStorage;

//let profileSchema = pSchema(UUID,"DeanI","Dean","Itzhak","DeanItzhak@gmail.com","Dean1900",true,Date.now,0);
const newProfile = new profileModel({
    userId: new ObjectId(3),
    userName: ["DeanI"],
    firstName: "Dean",
    lastName: "Itzhak",
    email: "Test@example.com",
    password: "Test123",
    status: true,
    createdAt:  Date.now,
    cancelCount: 0
});
newProfile.save()
    .then(savedProfile => {
        console.log("Profile saved successfully:", savedProfile);
    })
    .catch(error => {
        console.error("Error saving profile:", error);
    });
