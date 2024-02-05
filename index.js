const express = require('express');
const bodyParser = require('body-parser');
const MongoStorage = require('./db/mongo.storage');  // Note: Use 'MongoStorage' instead of 'mongoStorage'
//const AppointmentRepository = require('./reposetory/appointment.repository');
require('dotenv').config({ path: './.env' });
const port = process.env.PORT ;
// init file 
//***mongo connected***/
const mongoStorageInstance = MongoStorage.getInstance();
mongoStorageInstance.connect((error) => {
    if (error) {
        console.error('Connection error:', error);
    } else {
      setupExpressApp();
    }
});
//const appointmentRepositoryInstance = new AppointmentRepository();
//***start the if mongo connected***/
function setupExpressApp() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('frontend'));
  app.use('/js', express.static(__dirname + 'public/js'));
  app.use('/css', express.static(__dirname + 'public/css'));
  app.use('/images', express.static(__dirname + 'public/images'));
  app.use(express.urlencoded({ extended: false }));

  app.get('', (req, res) => {
      res.sendFile(__dirname + '/Frontend/landing.html');
  });
  app.listen(port, () => console.log('Listening on port', port));
  return app;
}
