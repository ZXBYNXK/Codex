# 8 ) JWT Authentication Middleware.

## Step by step summary.

// 1: <br> 
//  Create ./middleware/auth.js <br>
&nbsp;

// 2: <br>
//  Import jsonwebtoken for the use of the verify() method & config for the 'jwtSecret'. <br> 
&nbsp;

// 2: <br> 
//  Export a start of an anonymous function that will take req, res and next as arguments. <br> 
&nbsp;

// 3: <br> 
//  Assign a variable the the value of the json web token by accessing the 'x-auth-token' <br>
//  from the header of the request, 'req.header'. <br>
&nbsp;

// 4: <br> 
//  Check if there even is a token if not then return a status of 403 and a message. <br> 
&nbsp;

// 5: <br> 
//  Scince there is a token use the verify() method from npm 'jsonwebtoken' to <br> 
//  authenticate & decode the token provided from '3:' and use the 'jwtSecret' that signed <br>
//  the token to begin with. Assign the outcome to a variable. <br>
&nbsp;

// 6: <br>
//  Assign a property in the request object named 'user' or 'req.user' the value of the decoded <br>
//  token returned from the verify() method then call the next argument as a function meaning <br>
//  the next '(req, res) => {...}' anonymous function will be executed. <br>
&nbsp;

## Files to create, change or delete.

// Create: ./middleware/auth.js
// 1: 
//  mkdir middleware && touch middleware/auth.js
&nbsp;

// Change: 
//  ./middleware/auth.js
```javascript
// auth.js

// 2:
const jwt = require("jsonwebtoken"),
  config = require("config");

// 3:
module.exports = (req, res, next) => {
  // NOTE:
  //  This 'x-auth-token' is a key in the header object
  //  that has a paired value of the json web token
  //  assign the token a variable for further use.
  //  Check if there is an even a token recieved from the header.
  
  // 4:
  const token = req.header("x-auth-token");


  // 5:
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  // 6: 
  try {
    
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));

    req.user = decodedToken;

    next();

  } catch (err) {
    res.status(401).json({ message: "Token is not valid!" });
  }
};
```
