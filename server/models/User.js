const mongoose = require("mongoose");

// Define a schema for the data array
const DataSchema = new mongoose.Schema({
    point: { type: [Number] },
    credit: { type: [Number] },
    subject: { type: [String] },

});

// Define the user schema
const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String, default: null },
    email_verified: { type: Boolean, default: false },
    data: { type: [DataSchema], default: [] }
}, {
    timestamps: true
});

// Create the User model
const User = mongoose.model("User", UserSchema);

module.exports = User;
