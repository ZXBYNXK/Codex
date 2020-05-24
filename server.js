// Server.js
const express = require("express");
const server = express();
const connectDatabse = require("./config/db");
const PORT = process.env.PORT || "5000";

connectDatabse();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Server is running");
});


server.use("/api/auth", require("./routes/api/auth"));

server.use("/api/posts", require("./routes/api/posts"));

server.use("/api/profile", require("./routes/api/profile"));

server.use("/api/users", require("./routes/api/users"));

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
