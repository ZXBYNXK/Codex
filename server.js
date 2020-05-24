// Server.js 
const express = require("express");
const server = express();
// Changes -> Import connectDatabse function from config/db.js
const connectDatabse = require('./config/db');


const PORT = process.env.PORT || "5000";


server.get("/", (req, res) => {
  res.send("Server is running");
});

// Changes -> call the imported function to connect the database.
connectDatabse();

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
