// ROUTE: users.js
const bcrypt = require("bcryptjs");
const express = require("express");
const gravatar = require("gravatar");
const { check, validationResult } = require("express-validator");

// 2: import config and jwt
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../../models/User");

const router = express.Router();

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
    const { email, password, name } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user)
        res.status(401).json({ erros: { message: "Email allready exists." } });

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // 3: 
      //  Create a variable and assign it an object representing the payload.
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

      
    } catch (err) {
      console.error(err.message);

      res.status(400).json({ error: { message: err.message } });
    }
  }
);





module.exports = router;
