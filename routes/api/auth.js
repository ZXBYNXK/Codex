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

  // @route     POST 'api/auth'
  // @desc      Authenticate the user and get a token
  // @access    Private
  router.post("/", [
    check('email', 'Please include email.')
    .isEmail(),
    check('password', 'Invalid password')
    .exists()
  ], async (req, res) => {
  
      // Validate errors
      const errors = validationResult(req);
    
      // If errors is NOT empty
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Deconstruct email & password
      const { email, password} = req.body;

      try {

        // Search the User collection for one matching email which should be unique to the user .
        let user = await User.findOne({ email });
      
        // If there is NOT a User document in the collection with that email
        if (!user) {

        // Send back a bad request since there is no user with that email
        return res.send(400).json({message: "Invalid username and or password."})
      }
      
        // Now do a password comparison with bcrypt as a final validation step.
        const isPassword = await bcrypt.compare(password, user.password); 
      
        // If password is NOT valid.
        if (!isPassword) 
        {
          return res.send(400).json({message: "Invalid username and or password."});
        }
      
        // Create the payload to be passed as an argument to jwt
        const payload = {
          user: {
            id: user.id
          }
        };

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

});


  module.exports = router;