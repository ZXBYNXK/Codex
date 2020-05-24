// ROUTE: users.js
// Changes -> import gravatar, bcryptjs
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// Changes -> Import User model
const User = require("../../models/User");

// @route     POST 'api/users'
// @desc      Registers new users
// @access    Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include valid email").isEmail(),
    check("password", "Please enter 6 or more charachters.").isLength({
      min: 6,
    }),
  ],

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

      await user.save();

      res.status(201).send(`New user: ${name} has registered!`);
    } catch (err) {
      console.error(err.message);
      res.status(400).json({ error: { message: err.message } });
    }
  }
);

module.exports = router;
