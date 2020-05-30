  // ROUTE: posts.js

  //2: For all files
  const express = require('express');
  const router = express.Router();
  
  // @route     GET 'api/posts'
  // @desc      Test Route
  // @access    Public 
  router.get('/', (req, res) => res.status(200).send('TEST: api/posts'))


  


  module.exports = router;