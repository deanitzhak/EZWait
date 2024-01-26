// mongoDBConnector.js
const { MongoClient, ServerApiVersion } = require('mongodb');
const privateConfig = require('./Integrations/privateConfig.js');

const uri = privateConfig.getUri();
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectToMongoDB() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return client;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

async function closeMongoDBConnection() {
  try {
    await client.close();
    console.log("MongoDB connection closed.");
  } catch (error) {
    console.error("Error closing MongoDB connection:", error);
    throw error;
  }
}

module.exports = { connectToMongoDB, closeMongoDBConnection };
