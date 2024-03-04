const MongoStorage = require('../db/mongo.storage');

class ProfileRepository extends MongoStorage {
    constructor(mod) {
        super(mod); 
        this.Model = mod;
        this.updateProfileValue = this.updateProfileValue.bind(this);
        this.findByUserName = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findOne = this.findOne.bind(this);
        this.createNewProfile = this.createNewProfile.bind(this);

    }

    // UserRepository.js

    async  createNewProfile(profileData) {
        try {
            const newProfile = new Profile(profileData);
            return await newProfile.save();
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }


    async updateProfileValue(profileId, key, value) {
        try {
            const profile = await this.Model.findById(profileId);
            if (!profile) {
                throw new Error('Profile not found');
            }
            profile[key] = value;
            const updatedProfile = await profile.save();
            return updatedProfile;
        } catch (error) {
            throw new Error(`Error updating profile value: ${error.message}`);
        }
    }

    async findByUserName(userName) {
        try {
            const profile = await this.findByAttribute('userName', userName);
            return profile;
        } catch (error) {
            throw new Error(`Error retrieving profiles by userId: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const profiles = await this.find();
            return profiles;
        } catch (error) {
            throw new Error(`Error retrieving profiles: ${error.message}`);
        }
    }
    async findOne(query) {
        try {
            const profile = await this.Model.findOne(query);
            return profile;
        } catch (error) {
            throw new Error(`Error retrieving profile: ${error.message}`);
        }
    }



}
module.exports = ProfileRepository;