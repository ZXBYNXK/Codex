# 10 ) User profile model.

## Step by step summary.

// 1: Create 'Profile.js' file in the models directory, and import mongoose then initialize a <br>
// Profile schema. <br>  
&nbsp;

// 2: In the Profile schema create a field that references an id from the User model <br>
&nbsp;

// 3: Create the rest of the fields I want the Profile to have<br>
&nbsp;

## Files to create, change or delete.

// Create: ./models/Profile.js <br>

```javascript
    // MODEL: Profile.js

    // 1: Import mongoose
    const mongoose = require("mongoose");

    // 1: inititalize a Profile schema
    const ProfileSchema = mongoose.Schema({

        // 2: Create a reference to the user model
        user: {
            type: String,
            id: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }

        // 3: Create the rest of the fields
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

    })



```
