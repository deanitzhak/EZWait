const express = require('express');
const bodyParser = require('body-parser');
const privateConfig = require('./Integrations/privateConfig.js');
const { connectToMongoDB, closeMongoDBConnection } = require('./mongoDBConnector.js');
const app = privateConfig.getApp();
const port = privateConfig.getPort();
let mongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('Fronted'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use(express.urlencoded({ extended: false }));

app.get('', (req, res) => {
  res.sendFile(__dirname + '/Frontend/landing.html');
});

///******main******////
async function run() {
  try {
    mongoClient = await connectToMongoDB();
  } catch(error){
    mongoClient = await closeMongoDBConnection();
  }
}
app.listen(port, () => console.log('Listening on port', port));
run().catch(console.dir);