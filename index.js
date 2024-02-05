const express = require('express');
const bodyParser = require('body-parser');
const mongoStorage = require('./db/mongo.storage');
require('dotenv').config();
const port = process.env.PORT ;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Frontend'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use(express.urlencoded({ extended: false }));

app.get('', (req, res) => {
  res.sendFile(__dirname + '/Frontend/profile.html');
});
//***testing***/
const mongoClient = new mongoStorage();

app.listen(port, () => console.log('Listening on port', port));

// Placeholder run function, you need to define it according to your requirements.
async function run() {
  console.log('Run function is called.');
}
run().catch(console.dir);
