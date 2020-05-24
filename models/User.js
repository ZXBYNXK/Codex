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
