  // ROUTE: auth.js 
  const express = require('express');
  const router = express.Router();
  const auth = require('../../middleware/auth');
  const jwt = require("jsonwebtoken");
  const config = require("config");
  const User = require("../../models/User");
  const bcrypt = require("bcryptjs");
  const { check, validationResult } = require("express-validator");

  // @route     GET 'api/auth'
  // @desc      Test Route
  // @access    Public 
  router.get('/', auth, (req, res) => res.status(200).send('TEST: api/auth'))

// 1: Start the process of a post route
// @route     POST 'api/auth'
// @desc      Authenticate the user and get a token
// @access    Private
router.post("/", [
  check('email', 'Please include email.')
  .isEmail(),
  check('password', 'Invalid password')
  .exists()
], async (req, res) => {
  
  // 2: Pass the request object as an argument to test for any errors after 
  // validation.
  const errors = validationResult(req);
  
  // 3:  If errors is NOT empty
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // 4: Deconstruct email & password
  const { email, password} = req.body;

  try {
    // 5: Search the Schemas for a matching email which should be unique to the user .
    let user = await User.findOne({ email });
    
    // 6: If there is no User document in the collection with that email
    if (!user) {
      return res.send(400).json({message: "Invalid username and or password."})
    }

    // NOTE: If the code block above is executed then that means a false value was returned from the method to the
    // variable in "5:", most in importantly the code below will NOT execute if that is the case.
    
    // 8: (bcrypt)
    // Now do a password comparison with bcrypt as a final validation step.
    const isPassword = await bcrypt.compare(password, user.password); 
    
    // 8: (bcrypt)
    // If password is valid.
    if (!isPassword) 
    {
      return res.send(400).json({message: "Invalid username and or password."});
    }


    // 10: (JsonWebToken) 
    // Create the payload to be passed as an argument and can be decoded in other routes
    // who use the auth middle ware.
    const payload = {
      user: {
        id: user.id
      }
    };

    // 10: (bcrypt) 
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
    // Log the error, this code block executes only if there is a problem on the server.
    console.error(message);
    return res.send(500).json({ message });
  }



})


  module.exports = router;