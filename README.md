# 2) Set up of mongoose database.

## Step by step in summary.
// 1: Go to mongodb atlas and find the URI connection string.
&nbsp;

// 2: Create file ./config/default.json to contain the URI connection string
&nbsp;

// 3: Create file ./config/db.js to contain a asynchronous function that connects to mongoose then export it.
&nbsp;

// 4: Import the newly created function into ./server.js file and call that function in the appropriate place.
&nbsp;

// 5: Add the config directory to the .gitignore file.
&nbsp;

## Files to create change or delete.
// Create: ./config/default.json
```javascript
        // default.json
        {
                "mongoUri": "mongodb+srv://<DB-USER-NAME>:<PASSWORD>@<CLUSTER-NAME>/<COLLECTION-NAME>?retryWrites=true"
        }
```
&nbsp;

// Create: ./config/db.js 
```javascript
        // db.js

        // Import 2 packages mongoose and config to obtain the 'mongoUri' connection string.
        const mongoose = require('mongoose');
        const config = require('config');
        
        // In any case where you need a value from config you use 'config.get(KEY-NAME)'
        const MONGO_URI = config.get('mongoUri');

        // This will be the function that is exported to server.js
        const connectDatabase = async () => {
                
                try {
                        // This connect method is responsible for attempting to 
                        await mongoose.connect(MONGO_URI);
                } 
                catch (err) {
                        // Log the error to the console.
                        console.error(err);

                        // Handle the error by sending node to exit this process with 1 meaning no good.
                        process.exit();
                }
        }

        // Export the function for use in ./server.js
        module.exports = connectDatabase;
```
&nbsp;

// Change: server.js  
```javascript
        // server.js
        const express = require("express");

        const server = express();
        
        // ( Changes ) Import the exported function created in db.js
        const connectDatabase = require('./config/db.js');

        const PORT = process.env.PORT || "5000";
       
        server.get("/", (req, res) => { res.send("Server is running") });
        
        // ( Changes ) Now call the function to connect the database
        connectDatabase();

        server.listen(PORT, () => { console.log(`Listening on port ${PORT}...`) })
```
&nbsp;

// Change: .gitignore
```text
        .gitignore
        node_modules
        config
```
&nbsp;