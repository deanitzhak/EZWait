const {Schema, model, ObjectId, isValidObjectId} = require("mongoose");

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
        variantsAB: {
            type: Object,
            properties: {
                A: String,
                B: String,
                C: String,
            },
            required: function () {
                return this.type === "a-b";
            }
        },
        variantsFF: {
            type: Object,
            properties: {
                ON: {
                    type: Boolean,
                    default: true,
                    validate: {
                        validator: (ON) => ON,
                        message: "Feature flag variant ON must be true",
                    },
                },
                OFF: {
                    type: Boolean,
                    default: false,
                    validate: {
                        validator: (OFF) => !OFF,
                        message: "Feature flag variant OFF must be false",
                    },
                },
            },
            required: function () {
                return this.type === "f-f";
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

function deviceValidator(devices) {
    const devicesSet = new Set([
        "console",
        "mobile",
        "tablet",
        "smarttv",
        "wearable",
        "embedded",
        "desktop",
    ]);
    return devices.every((device) => devicesSet.has(device.value.toLowerCase()));
}

function countryValidator(countries) {
    return countries.every((country) => !!iso.whereAlpha2(country.value));
}

module.exports = model("Appointment", appointmentSchema);