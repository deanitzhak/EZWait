require('dotenv').config();
const domain = `http://localhost:${process.env.PORT}`;

const APIpaths = {
    appointment : domain + '/appointment',
    appointmentById: domain + '/appointment/id',
    domain: domain,
};

module.exports = APIpaths;
