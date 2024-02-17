const MongoStorage = require('../db/mongo.storage');
const { messegeSentModel } = require('../models/messegeSent.model');

class MessegeSentRepository extends MongoStorage {
    constructor() {
        super(); 
        this.Model = messegeSentModel;
        this.updateMessegeSentValue = this.updateMessegeSentValue.bind(this);
        this.findByUserId = this.findByUserName.bind(this);
        this.findAll = this.findAll.bind(this);
    }

    async updateMessegeSentValue(messegeSentId, key, value) {
        try {
            const messegeSent = await this.Model.findById(messegeSentId);
            if (!messegeSent) {
                throw new Error('Messege sent not found');
            }
            messegeSent[key] = value;
            const updatedMessegeSent = await messegeSent.save();
            return updatedMessegeSent;
        } catch (error) {
            throw new Error(`Error updating messege sent value: ${error.message}`);
        }
    }

    async findByUserName(userName) {
        try {
            const messegeSent = await this.findByAttribute('userName', userName);
            return messegeSent;
        } catch (error) {
            throw new Error(`Error retrieving messege sent by userId: ${error.message}`);
        }
    }

    async findAll() {
        try {
            const messegeSents = await this.find();
            console.log(messegeSents);
            return messegeSents;
        } catch (error) {
            throw new Error(`Error retrieving messege sents: ${error.message}`);
        }
    }
}

module.exports = MessegeSentRepository;
