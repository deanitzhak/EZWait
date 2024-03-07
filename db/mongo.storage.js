const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Path = require("path");
module.exports = class MongoStorage {
    constructor(Model) {
        this.Model = Model;
    }
    connect() {
        const connectionUrl = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.nf5xuf0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
        return new Promise((resolve, reject) => {
            mongoose.connect(connectionUrl)
                .then(() => {
                    console.log("connected");
                    resolve(); 
                })
                .catch((err) => {
                    reject(err); 
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

    async findByAttribute(key, value) {
        try {
            const query = {};
            query[key] = value;
            const appointments = await this.Model.find(query);
            return appointments;
        } catch (error) {
            throw new Error(`Error retrieving appointments by ${key}: ${error.message}`);
        }
    }
    retrieve(id) {
        return this.Model.findById(id);
    }

    create(data) {
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