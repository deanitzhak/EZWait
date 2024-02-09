const MongoStorage = require('../db/mongo.storage');
const { messageReplayModel } = require('../models/messageReplay.model');

class messageReplayRepository extends MongoStorage {
    constructor() {
        super(); 
        this.Model = messageReplayModel;
        this.updateMessageReplayValue = this.updateMessageReplayValue.bind(this);
        this.findByUserId = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
    }

    async updateMessageReplayValue(messageReplayId, key, value) {
        try {
            const messageReplay = await this.Model.findById(messageReplayId);
            if (!messageReplay) {
                throw new Error('Message replay not found');
            }
            messageReplay[key] = value;
            const updatedMessageReplay = await messageReplay.save();
            return updatedMessageReplay;
        } catch (error) {
            throw new Error(`Error updating message replay value: ${error.message}`);
        }
    }

    async findByUserName(userName) {
        try {
            const messageReplay = await this.findByAttribute('userName', userName);
            return messageReplay;
        } catch (error) {
            throw new Error(`Error retrieving messages replay by userId: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const messageReplays = await this.find();
            console.log(messageReplays);
            return messageReplays;
        } catch (error) {
            throw new Error(`Error retrieving message replay: ${error.message}`);
        }
    }
}

module.exports = messageReplayRepository;

