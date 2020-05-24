# 5 ) User registration validation.

## Step by step summary.

// 1: Change ./routes/api/users.js from a test route to a post route to register new users. <br>
// 2: Change ./server.js by adding body parser middleware to parse incoming requests. <br>
// 3: Change ./routes/api/users.js add a second parameter to implement express validator.<br>
&nbsp;

## Files to create, change or delete.

// Change ./server.js

```javascript
// ./server.js

// file...

// Changes:
server.use(express.json());

// ...file
```

// Change: ./routes/api/users

```javascript
// ./routes/api/users.js

// file...

// Changes:
// 3: deconstruct the following from express-validatior
const { check, validationResult } = require("express-validator");

// 1: Change test route to POST route to parse incoming requests
// @route     POST 'api/users'
// @desc      Registers new users
// @access    Public

router.post(
  "/",
  // 3:
  //    As a second argument in this route.
  //    Add an array of check methods to validate the fields
  //    based from the User model see ./models/User.js
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check("password", "Please enter 6 or more charachters.").isLength({
      min: 6,
    }),
  ],

  (req, res) => {
    // 3:
    //  'validationResult' returns an object when 'req' is passed to 'validationResult' which uses
    // the check methods above sort of like a switch statement and evaluates all its keys & values.
    const errors = validationResult(req);

    // if errors is not empty
    if (!errors.isEmpty()) {
      // Send back a bad request with a json object containing the messages from above.
      return res.status(400).json({ errors: errors.array() });
      // NOTE: WIll come in handy with react.
    }

    res.send("Logged post");
  }
);

// ...file
```
