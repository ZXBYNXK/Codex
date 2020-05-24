  // ROUTE: users.js
  const express = require('express');
  const router = express.Router();
  // 3: deconstruct the following from express-validatior
  const {check, validationResult} = require('express-validator')


// 1: Change test route to POST route to parse incoming requests
  // @route     POST 'api/users'
  // @desc      Registers new users
  // @access    Public

  router.post('/', 
    // 3: 
    //    As a second argument in this route.
    //    Add an array of check methods to validate the fields
    //    based from the User model see ./models/User.js 
  [
      check('name', 'Name is required')
      .not()
      .isEmpty(),
      check('email', 'Please include valid email').isEmail(),
      check('password', 'Please enter 6 or more charachters.').isLength({ min: 6 }),  
  ],

  (req, res) => {
    // 3: 
    //  'validationResult' returns an object when 'req' is passed to 'validationResult' which uses 
    // the check methods above sort of like a switch statement and evaluates all its keys & values. 
    const errors = validationResult(req);
    
    // if errors is not empty  
    if(!errors.isEmpty()) {

        // Send back a bad request with a json object containing the messages from above. 
        return res.status(400).json({ errors: errors.array()})
        // NOTE: WIll come in handy with react.
    }

    res.send('Logged post')
  })

  module.exports = router;