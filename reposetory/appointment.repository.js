
const MongoStorage = require('../db/mongo.storage');
const mongoose = require("mongoose");

module.exports = new (class AppointmentRepository extends MongoStorage {
    constructor() {
        super("Appointment");
        this.updateAppointmentStatus = this.updateAppointmentStatus.bind(this);
    }

    find() {
        return this.Model.find({}).populate({ path: 'schedual' });
    }

    findByTwoAttributes(key, value, key2, value2) {
        const obj = {};
        obj[key] = value;
        if (key2 && value2) {
            obj[key2] = value2;
        }
        return this.Model.find(obj).populate({ path: 'schedual' });
    }

    findByAttribute(key, value, key2, value2) {
        const obj = {};
        obj[key] = value;
        if (key2 && value2) {
            obj[key2] = value2;
        }
        return this.Model.find(obj).populate({ path: 'schedual' });
    }

    retrieve(id) {
        return this.Model.findById(id).populate({ path: 'schedual' });
    }

    async findByDate(year, month, day) {
        const pipeline = [
            {
                $match: {
                    'duration.startTime': {
                        $gte: new Date(year, month - 1, day, 1),
                        $lt: new Date(year, month - 1, day, 1),
                    },
                },
            },
            {
                $group: {
                    _id: '$status',
                },
            },
        ];
        const results = await this.Model.aggregate(pipeline);
        return results;
    }
})();




/*
const MongoStorage = require('../db/mongo.storage');
const { mongoose } = require("mongoose");


module.exports = new (class AppointmentRepository extends MongoStorage {
  constructor() {
    super("Appointment");
    this.updateAppointmentStatus = this.updateAppointmentStatus.bind(this);
  }

  find() {
    return this.Model.find({}).populate({ path: 'schedual' })
  }

  findByTwoAttributes(key, value, key2, value2) {
    const obj = {}
    obj[key] = value;
    if (key2 && value2) {
      obj[key2] = value2;
    }
    return this.Model.find(obj).populate({ path: 'schedual' });
  }

  findByAttribute(key, value) {
    const obj = {}
    obj[key] = value;
    if (key2 && value2) {
      obj[key2] = value2;
      return this.Model.find(obj).populate({ path: 'schedual' });
    }

    retrieve(id) {
      return this.Model.findById(id).populate({ path: 'schedual' });
    }
  }
  async findByDate(year, month, day) {
    const pipeline = [
      {
        $match: {
          'duration.startTime': {
            $gte: new Date(year, month - 1, day, 1),
            $ltw: new Date(year, month - 1, day, 1),

          },
        },
      },
      {
        $group: {
          _id: '$status',
        },
      },
    ];
    const results = await this.Model.aggregate(pipline);
    return results;
  }


*/
//   async retrieveByUuid(uuid) {
//     try {
//       let attribute = await this.findByAttribute("appointmentId", uuid);
//       console.log(attribute);
//       return attribute;
//     } catch (error) {
//       console.error("Error retrieving attribute by UUID:", error);
//       throw error;
//     }
//   }
// }
// module.exports = new AppointmentRepository();
