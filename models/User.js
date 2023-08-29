// Import mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Create a Schema using mongoose
const Schema = mongoose.Schema;

// Define the structure of the User schema
const UserSchema = new Schema({
    name: String,          // User's name
    email: String,         // User's email
    password: String,      // User's password
    dateOfBirth: Date      // User's date of birth
});

// Create a model using the UserSchema, named 'User'
const User = mongoose.model('User', UserSchema);

// Export the User model to be used in other parts of the application
module.exports = User;
