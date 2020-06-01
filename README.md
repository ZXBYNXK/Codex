# 11) Setting up user profile routes.

## Files to create, change or delete.
Change: ./routes/api/profile.js
```javascript

// ROUTE: profile.js

const express = require("express");
const router = express.Router();

// 1: Import auth middleware, also both the User and Profile models.
const auth = require("./auth");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// @route     GET 'api/profile/me'
// @desc      Get and return a single user's profile privately.
// @access    Private

// 2: Change the endpoint to "/me" and add auth as middleware to this route.
router.get("/me", auth, async (req, res) => {
  // 3: In a try & catch block attempt to obtain & return the user's profile from the databse (try),
  // and return two errors one if profile is'nt found or two a server error (catch block)
  try {
    // Attempt to find a user in the Profile collection referencing to the ObjectId with 'req.user.id'
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]);

    // If user profile is not found just return a bad request, dont need to be descriptive to the public.
    if (!profile) {
      return res.status(401).json({ message: "Bad Request!" });
    }

    // If code execution makes it here that means things went well.
    // So return the profile
    res.json({ profile });
  } catch (err) {
    // Handle server error
    console.error(err.message);
    res.status(500).send("Server Error!");
  }
});

module.exports = router;

```

