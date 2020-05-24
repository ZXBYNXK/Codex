# 6 ) Registering users to the database.

## Step by step summary.

// 1: See if user exists <br>
// 2: Get users gravatar <br>
// 3: Encrypt password <br>
// 4: Save the user to database <br>
&nbsp;

## Files to create, change or delete.

// Change: ./routes/api/users.js

```javascript
// Changes -> Import User model
const User = require("../../models/User");

// Changes -> import gravatar, bcryptjs
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

// file...

async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Deconstruct from req.body
  const { email, password, name } = req.body;

  try {
    // 1: See if the user exists

    // Check user collection for an email matching the deconstructed 'email' value.
    let user = await User.findOne({ email });

    // if the above value has anything in it then true so email allreadt exists.
    if (user)
      res.status(401).json({ erros: { message: "Email allready exists." } });

    // Logic will continue scince the above not sent as a response.

    // 2: Get users gravatar
    //
    const avatar = gravatar.url(email, {
      // s: = size
      s: "200",
      // r: = rating
      r: "pg",
      // d: = default
      d: "mm",
    });

    // Since the variable 'user' is still empty lets assign it a value of a new user schema.
    user = new User({
      name,
      email,
      avatar,
      password,
    });

    // 3: Encrypt password with bcryptjs
    // Salting is just a random string to attach to a hashed password becuase
    // it prevents attackers from figuring out typical hashed patterns from common words.
    const salt = await bcrypt.genSalt(10);

    // This is all that is required for hashing the password verifying is also a similar process.
    user.password = await bcrypt.hash(password, salt);

    // Now save the new user to the database.

    // 4: Save user to database.
    await user.save();

    res.send(201).send(`New user: ${name} has registered!`);
  } catch (err) {
    console.error(err.message);
    res.send(400).json({ error: { message: err.message } });
  }
};

// ...file
```
