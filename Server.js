const express = require('express'); //import Node.js
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require("body-parser");
// private confic to mongo
const privateConfig = require('./Integrations/privateConfig.js');
const uri = privateConfig.getUri();
const app = privateConfig.getApp();
const port = privateConfig.getPort();
app.use(bodyParser.urlencoded({extended:true}));
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
//connect to mongo async!
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
//****************/
//static files
app.use(express.static('Fronted'));
app.use('js/',express.static(__dirname+'public/js'));
app.use('css/',express.static(__dirname+'public/css'));
app.use('images/',express.static(__dirname+'public/images'));
app.use(express.urlencoded({extended:false}))
app.get('',(req,res)=>{
  res.sendFile(__dirname+'/Frontend/index.html');
})
app.listen(port, ()=> console.log('Listening on port',port));