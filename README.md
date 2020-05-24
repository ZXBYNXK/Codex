# 4 ) API initial setup.

## Step by step summary.
// 1: Create ./routes/api/ -> users.js, auth.js, profile.js & posts.js <br>
// 2: Create a test route for all files. <br>
// 3: Import all the routes to ./server.js file & use as middleware with a defined endpoint <br>
&nbsp;

## Files to create, change or delete.
// Create: ./routes/api/ -> users.js, auth.js, profile.js & posts.js <br>
//    1: mkdir routes routes/api && cd routes/api/ && touch users.js auth.js profile.js posts.js <br>
&nbsp; 

// Change: ./routes/api users.js auth.js profile.js posts.js
```javascript
//    NOTE: For all files include the following but change the test message

//    Inital setup of any mongoose route other than the root of the app.
  const express = require('express');
  const router = express.Router();

//    2: Test route
  router.get('/', (req, res) => res.status(200).send('<TEST-MESSAGE>'))

//    Export 
  module.exports = router;
```

// Change: ./server.js
```javascript
// server.js

// Added the following code
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

```