const {Schema, model, ObjectId, isValidObjectId} = require("mongoose");
const {v4: uuidv4} = require('uuid');

const attributeSchema = new Schema({
    value: String,
    valueReqCount: {
        type: Number, default: 0, min: 0, required: true, validate: {
            validator: (reqCount) => reqCount % 1 === 0,
            message: "At least one value must be provided, and reqCount must be a whole number"
        }
    }
}, { _id : false })

const appointmentSchema = new Schema(
    {
        appointmentId: {type: ObjectId, required: true, validate: [isValidObjectId, "appointmentId must be a valid id"]},
        type: {
            type: String,
            enum: ["option1","option2","option3","option4"],
            required: true,
        },
        customAttributes: {
            type: Map,
            of: [attributeSchema],
            default: null,
        },

        trafficPercentage: {type: Number, min: 0, max: 100, required: true},
        callCount: {type: Number, default: 0, min: 0, required: true},
        monthlyCallCount: {type: Number, default: 0, min: 0, required: true},
        status: {
            type: String,
            required: true,
            enum: {
                values: ["active", "ended", "terminated", "planned"],
                message: `{VALUE} is not a valid status.`,
            },
        },
        duration: {
            type: Object,
            properties: {
                startTime: Date,
                endTime: Date,
            },
            required: true,
            validate: {
                validator: (duration) => {
                    return duration.endTime > duration.startTime;
                },
                message: "Start time should be prior to end time",
            },
        },

        goals: {
            type: [ObjectId],
            validate: {
                validator: (goals) => goals.length > 0 && goals.every(isValidObjectId),
                message: "There Must be at least one goal, all goals must be of type mongoose objectId"
            },
            ref: 'Goal'
        }
    },
    {
        collection: "Appointment"
    }
);

module.exports = model("Appointment", appointmentSchema);