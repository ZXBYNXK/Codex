// ROUTE: users.js
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
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

      res.status(201).send(`New user: ${name} has registered!`);
    } catch (err) {
      console.error(err.message);

      res.status(400).json({ error: { message: err.message } });
    }
  }
);

module.exports = router;
