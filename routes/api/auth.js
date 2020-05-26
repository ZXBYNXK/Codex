  // ROUTE: auth.js 
  const express = require('express');
  const router = express.Router();
  const auth = require('../../middleware/auth');


  // @route     GET 'api/auth'
  // @desc      Test Route
  // @access    Public 

  // 
  router.get('/', auth, (req, res) => res.status(200).send('TEST: api/auth'))

  module.exports = router;