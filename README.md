# 3) Review models directory.

## Step by step in summary.

// 1: Review ./models/User.js .
// 2: Review ./models/Post.js
&nbsp;

### Review of ./models directory.

// ./models/User.js
// Need to update the user schema to use an avatar property
// and possible

```javascript
// User.js
const mongoose = require("mongoose"),
  UserSchema = mongoose.Schema({
    user: {
      type: String,
      required: true,
      unique: true,
    },
    // Changes
    avatar: {
            type: String.
            default: "path-to-default-image"
        },

    online: {
      type: Boolean,
      default: false,
    },
    gitid: {
      type: Number,
      unique: true,
    },
    registerDate: {
      type: Date,
      date: Date.now,
    },
  });
module.exports = mongoose.model("User", UserSchema);
```

// ./models/Post.js
// No changes as of yet
```javascript
// Post.js
const mongoose = require("mongoose"),
  PostSchema = mongoose.Schema({
    avatar: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    post: {
      type: String,
      tags: ["posts"],
      required: true,
      minlength: 3,
      maxLength: 300,
    },
    thumbups: {
      type: Array,
      tags: ["thumbups"],
    },
    thumbdowns: {
      type: Array,
      tags: ["thumbdowns"],
    },
  });

module.exports = mongoose.model("Post", PostSchema);
```
