// MODEL: Profile.js

// Import mongoose & start the schema.
const mongoose = require("mongoose"),
  ProfileSchema = mongoose.Schema({
    
    // This references a objectId from another Model
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },

    bio: {
        type: String,
    },

    // Newbie, Junior, Senior
    status: {
      type: "String",
      required: true,
    },

    // Javascript, Python, Java, Angular, Kubernetes...
    skills: {
      type: [String],
      required: true,
    },


    githubusername: {
      type: String,
    },
});

module.exports = ProfileSchema;
