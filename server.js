// Import express 
const express = require("express");

// Inherit the power of express
const server = express();

// Check for port first or run on 5000
const PORT = process.env.PORT || "5000";

// Create a basic get request for testing. (See in post man or browser.)
server.get("/", (req, res) => {
  res.send("Server is running");
});

// Set the server to listen on PORT & execute a callback function.
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
