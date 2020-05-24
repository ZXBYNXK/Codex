// db.js 

const mongoose = require('mongoose');
const config = require('config');
const MONGO_URI = config.get('mongoUri');
const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true});
        console.log('Connected to database');  
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
module.exports = connectDatabase;