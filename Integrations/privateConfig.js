const express = require('express');
const privateConfig = (() => {
    const uri = "mongodb+srv://ezwaitport:EZWaitport3000@cluster0.nf5xuf0.mongodb.net/?retryWrites=true&w=majority";//connect to Mongo
    const app = express();
    const port = 3000;
    return {
        getUri: () => uri,
        getApp: () => app,
        getPort: () => port
    };
})();
module.exports = privateConfig;
