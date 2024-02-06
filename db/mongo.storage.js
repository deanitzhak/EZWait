const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Path = require("path");
const { Schema, model } = require('mongoose');

module.exports = class MongoStorage {

    constructor() {

    }
    connect() {
        const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.nf5xuf0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        return new Promise((resolve, reject) => {
            mongoose.connect(connectionUrl)
                .then(() => {
                    console.log(`Connected to ${process.env.DB_CLUSTER} ${process.env.DB_NAME} collection`);
                    resolve(); // Resolve the promise when connected
                })
                .catch((err) => {
                    console.error(`Connection error: ${err}`);
                    reject(err); // Reject the promise if there's an error
                });
        });
    }

    find() {
        return this.Model.find({});
    }

    findByTwoAttributes(key, value, key2, value2) {
        const obj = {};
        obj[key] = value;
        if (key2 && value2) {
            obj[key2] = value2;
        }
        return this.Model.find(obj);
    }

    findByAttribute(key, value) {
        const obj = {};
        obj[key] = value;
        return this.Model.find(obj);
    }

    retrieve(id) {
        return this.Model.findById(id);
    }

    create(data) {
        
        //const entity = new this.Model(data);
        return data.save();
    }

    createMany(data) {
        return this.Model.create(data)
    }

    delete(id) {
        return this.Model.findByIdAndDelete(id);
    }

    update(id, data) {
        return this.Model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
    }

    updateMany(filter,update,options) {
        return this.Model.updateMany(filter, update, options)
    }
};