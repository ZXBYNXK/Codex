# 7 ) Assigning a jsonwebtoken after registration.

## Step by step summary.

// 1: Create the secret string used to sign each token. <br>
// 2: Import config & jsonwebtoken into ./routes/api/users.js <br>
// 3: <br>
//   Create a variable and assign it an object containing the database id of the user, 
//   which will represent the payload given to the jwt.sign() method later on. <br>
// 4: <br>
//   Use the 'sign()' method with the defined payload & secret to sign a token then execute a callback <br>
//   to handle errors or send the token back as the response. <br>
&nbsp;

## Files to create, change or delete.

// Change: ./config/default.json

```javascript
// CONFIG: default.json

// 1: Create the secret string which can be any arbitrary value like a password.
{
    "mongoUri": "mongodb+srv://<USER-NAME>:********@<CLUSTER>/<APP-NAME>?retryWrites=true"
    "jwtSecret": "****************************************"
}
```

&nbsp;

// Change: ./routes/api/users.js

```javascript
// ROUTE: users.js

// 2:
// import config to obtain the secret string used to sign the tokens.
const config = require("config");

// import npm jsonwebtoken package to use the methods it contains.
const jwt = require("jsonwebtoken");

// file...

// JsonWebToken = header.payload.signature encrypted to a-9.a-9.a-9
/* 
  Example: 
  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. (Header - Default: {'alg': HS256, typ:'JWT'}) 
  eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ. (Payload)
  SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c (Signature)
  */

// Note: The 'user' variable now allready saved to the database has its id.
// see ./routes/users.js or previous section about how that all takes place.

// 3: 
//  Creating the payload object to obtain the users mongoose id.
const payload = {
  user: {
    id: user.id,
  },
};

// 4:
//  Sign the token the payload secret, set expiration and create a callback after signing.
//  jwt.sign(<PAYLOAD>, <JWT-SECRET>, <OPTIONS>, <CALLBACK> )
jwt.sign(
  // The payload above
  payload,
  // Imported secret string
  config.get("jwtSecret"),
  // Set to expire in a day normally an hour which is 3600
  { expiresIn: 360000 },

  // Callback fuction to handle an error or return the token as the response
  (err, token) => {
    if (err) throw err;
    res.json({ token });
  }
);

// NOTE: 
//  After this you can create a middleware that uses the jwt.verify() method to verify tokens
//  in order to protect private endpoints. Will cover in next section.

// ...file
```
