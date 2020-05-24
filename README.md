# 3) Creating models and the models directory.

## Step by step in summary.
// 1: Create file ./models/User.js .
&nbsp;
// 2: Import mongoose
&nbsp;
// 3: Create a schema with mongoose containing the fields that every 'User' document contains.
&nbsp;
// 4: Export the variable assigned to the schema as a model with mongoose.
&nbsp;

## Files to create, change or delete.

// Create: ./models/User.js

// 1: mkdir models && touch models/User.js

```javascript
// User.js

// 2: Import mongoose
const mongoose = require("mongoose");

// 3: Create the schema with all the fields filled out.
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// 4: Export the schema with mongoose.model(<SCHEMA-NAME>, <VARIABLE-NAME-OF-SCHEMA>)
module.exports = mongoose.model("User", UserSchema);
```
