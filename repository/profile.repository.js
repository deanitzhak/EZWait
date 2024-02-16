const MongoStorage = require('../db/mongo.storage');
const { profileModel } = require('../models/profile.model');

class ProfileRepository extends MongoStorage {
    constructor() {
        super(); 
        this.Model = profileModel;
        this.updateProfileValue = this.updateProfileValue.bind(this);
        this.findByUserId = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
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
            console.log(profiles);
            return profiles;
        } catch (error) {
            throw new Error(`Error retrieving profiles: ${error.message}`);
        }
    }
}

module.exports = ProfileRepository;
