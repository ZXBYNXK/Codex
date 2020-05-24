  // ROUTE: auth.js 
  const express = require('express');
  const router = express.Router();


  // @route     GET 'api/auth'
  // @desc      Test Route
  // @access    Public 
  router.get('/', (req, res) => res.status(200).send('TEST: api/auth'))

  module.exports = router;