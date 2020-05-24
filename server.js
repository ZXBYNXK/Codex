// Server.js
const express = require("express");
const server = express();
const connectDatabse = require("./config/db");
const PORT = process.env.PORT || "5000";

connectDatabse();

server.get("/", (req, res) => {
  res.send("Server is running");
});

// 3: Import routes and then use them as middleware.
// Endpoint: '/api/auth', Route Handler: './routes/api/auth.js'
server.use("/api/auth", require("./routes/api/auth"));

// Endpoint: '/api/posts'
// Route Handler: './routes/api/posts.js'
server.use("/api/posts", require("./routes/api/posts"));

// Endpoint: '/api/profile'
// Route Handler: './routes/api/profile.js'
server.use("/api/profile", require("./routes/api/profile"));

// Endpoint: '/api/users'
// Route Handler: './routes/api/users.js'
server.use("/api/users", require("./routes/api/users"));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
