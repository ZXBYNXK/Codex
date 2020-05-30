# 9 ) Login authentication.

## Step by step summary.

// 1: <br>
// Import bcryptjs, jwt, config, "check()" & "validationResult()" from express-validator <br>
//  Add the start of post route to the ./routes/api/auth.js file.  <br>   
&nbsp;

// 2: <br>
// Start the process of a post route.
&nbsp;

// 3: (express-validator) <br> 
// Pass the request object to the verify test for any errors after validation. <br>  
// And if any errors are present in the array then something is wrong<br>
&nbsp;

// 4: <br> 
// Deconstruct email & password from the body of the request. <br> 
&nbsp;

// 5: <br>
// Search for a User document for a matching email which should be unique to the user .<br> 
&nbsp;

// 6: <br>
// If there is no User document in the collection with that email <br>
&nbsp;

// 7: <br>
// Do a password comparison with bcrypt.compare() as a final validation step. <br>
// Validate the returned value from the compare method in a if statement <br>
&nbsp;

// 8: 
//  Create the payload to be passed as an argument and can be decoded in other routes who use the auth middle ware. <br>
&nbsp;

// 9: 
//  Create & sign the token in the same way during user registration. <br>
&nbsp;

// 10: 
//  Catch any other errors that could occur (catch block). <br>
&nbsp;

## Files to create, change or delete.
// Change: ./routes/api/auth.js
```javascript
  // ROUTE: auth.js 
  const express = require('express');
  const router = express.Router();
  const auth = require('../../middleware/auth');
  
  // 1: 
  const jwt = require("jsonwebtoken");
  const config = require("config");
  const User = require("../../models/User");
  const bcrypt = require("bcryptjs");
  const { check, validationResult } = require("express-validator");

    // 2: 
    // @route     POST 'api/auth'
    // @desc      Authenticate the user and get a token
    // @access    Private
    router.post("/", [
    check('email', 'Please include email.')
    .isEmail(),
    check('password', 'Invalid password')
    .exists()
    ], async (req, res) => {
    
  // 3: (express-validator) 
  // Pass the request object as an argument to test for any errors after 
  // validation.
  const errors = validationResult(req);
  
  // 3: (express-validator)  
  // If errors is NOT empty
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // 4: Deconstruct email & password from the body of the request.
  const { email, password} = req.body;

  try {

    // 5: Search for a User document for a matching email which should be unique to the user .
    let user = await User.findOne({ email });
    
    // 6: If there is no User document in the collection with that email
    if (!user) {
      return res.send(400).json({message: "Invalid username and or password."})
    }

    // NOTE: If the code block above is executed then that means a false value was returned from the method to the
    // variable in "5:", most in importantly the code below will NOT execute if that is the case.

    // 7: (bcrypt)
    // Now do a password comparison with bcrypt as a final validation step.
    const isPassword = await bcrypt.compare(password, user.password); 
    
    // 7: (bcrypt)
    // If password is valid.
    if (!isPassword) 
    {
      return res.send(400).json({message: "Invalid username and or password."});
    }


    // 8: (JsonWebToken) 
    // Create the payload to be passed as an argument and can be decoded in other routes
    // who use the auth middle ware.
    const payload = {
      user: {
        id: user.id
      }
    };

    // 9: (JsonWebToken) 
    // Create & sign the token in the same way during user registration.
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      {expiresIn: 36000},
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } 
  catch ({ message }) 
  {
    // 10: Catch any other errors.
    // Log the error, this code block executes only if there is a problem on the server.
    console.error(message);
    return res.send(500).json({ message });
  }

})
  module.exports = router;
```
