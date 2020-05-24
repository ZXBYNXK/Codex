// db.js 

// Import mongoose & config.
const mongoose = require('mongoose');
const config = require('config');

// Assign value of the secret URI string to the MONGO_URI variable.
const MONGO_URI = config.get('mongoUri');

// Declare an asyncronous function that uses npm mongoose to connect to Atlas or Local database.
const connectDatabase = async () => {
    try {
        // mongoose.connect() returns a Promise so await for the resolved or rejected value.
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Connected to database');  
    } catch (err) {
        // Log the error and end the exit the node process with 1 meaning no good.
        console.error(err);
        process.exit(1);
    }
}

// Export the connectDatabase function for use in ./server.js file.
module.exports = connectDatabase;