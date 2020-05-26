// auth.js

// 2:
//  import jsonwebtokrn and config.
const jwt = require("jsonwebtoken"),
  config = require("config");

// 3:
//  Export an an anonymous or defined function that contains three arguments req, res, next:
module.exports = (req, res, next) => {
  // 4:
  //  Assign the token from the header to a variable.
  const token = req.header("x-auth-token");

  // NOTE:
  //  This 'x-auth-token' is a key in the header object
  //  that has a paired value of the json web token
  //  assign the token a variable for further use.
  //  Check if there is an even a token recieved from the header.

  // 5:
  //  If the token is undefined or "" then send back a response
  // that a token was not provided.
  if (!token) {
    return res.status(403).json({ message: "No token provided!" });
  }

  // 6: 
  //  In a try & catch block
  //    try:
  //        Try to verify the token and assign the output value to a variable
  //        then assign that variable to the user property of the request object 'req.user'
  //    catch:
  //        Catch if the token is cannot pass verification then it is invalid.  
  
  try {
    
    // 6: Authenticate the provided token with the secret string or jsonSc
    const decodedToken = jwt.verify(token, config.get("jwtSecret"));

    // 6: Assign the decoded value to req.user object.
    req.user = decodedToken;

    // 6: Proceed to the nex
    next();

  } catch (err) {
    // 6: If the code made it here then a invalid token was passed.
    res.status(401).json({ message: "Token is not valid!" });
  }
};
