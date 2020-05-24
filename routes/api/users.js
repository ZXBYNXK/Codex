  // ROUTE: users.js
  
  //2: For all files
  const express = require('express');
  const router = express.Router();

  // @route     GET 'api/users'
  // @desc      Test Route
  // @access    Public 
  router.get('/', (req, res) => res.status(200).send('TEST: api/users'))

  module.exports = router;