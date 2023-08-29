const express = require('express');
const router = express.Router();

// Import the Mongoose user model
const User = require('./../models/User');

// Import bcrypt for password handling
const bcrypt = require('bcrypt');

// Signup route
router.post('/signup', (req, res) => {
    let {name, email, password, dateOfBirth} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim(); 

    // Check for empty input fields
    if (name == "" || email == "" || password == "" || dateOfBirth == "") {
        res.json({
            status: 'FAILED',
            message: 'Empty Input Fields!'
        });
    } 
    // Check for valid username format
    else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid Username Entered'
        });
    } 
    // Check for valid email format
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        res.json({
            status: 'FAILED',
            message: 'Invalid Email Entered'
        });
    } 
    // Check for valid date format
    else if (!new Date(dateOfBirth).getTime()) {
        res.json({
            status: 'FAILED',
            message: 'Invalid Date of Birth Entered'
        });
    } 
    // Check for password length
    else if (password.length < 8) {
        res.json({
            status: 'FAILED',
            message: 'Password must be 8 characters or longer'
        });
    } 
    else {
        // Checking if user already exists
        User.find({email}).then(result => {
            if (result.length) {
                // A user already exists
                res.json({
                    status: 'FAILED',
                    message: 'A user with the provided email already exists'
                });
            } else {
                // Try to create a new user 

                // Hash the password for security
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name,
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: 'SUCCESS',
                            message: 'Signup Successful',
                            data: result,
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            status: 'FAILED',
                            message: 'An error occurred while saving user account'
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.json({
                        status: 'FAILED',
                        message: 'An error occurred while hashing password'
                    });
                });
            }
        }).catch(err => {
            console.log(err);
            res.json({
                status: 'FAILED',
                message: 'An error occurred while checking for existing user'
            });
        });
    }
});

// Signin route
router.post('/signin', (req, res) => {
    let {email, password} = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        res.json({
            status: "FAILED",
            message: 'Empty credentials supplied'
        });
    } else {
        // Check if user exists
        User.find({email})
        .then(data => {
            if (data.length) {
                // User Exists

                const hashedPassword = data[0].password;
                bcrypt.compare(password, hashedPassword).then(result => {
                    if (result) {
                        // Password match
                        res.json({
                            status: "SUCCESS",
                            message: "Signin Successful",
                            data: data
                        });
                    } else {
                        res.json({
                            status: "FAILED",
                            message: "Invalid password entered"
                        });
                    }
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An error occurred while comparing passwords"
                    });
                });
            } else {
                res.json({
                    status: "FAILED",
                    message: "Invalid Credentials Entered"
                });
            }
        })
        .catch(err => {
            res.json({
                status: "FAILED",
                message: "An error occurred while checking for existing user account"
            });
        });
    }
});

module.exports = router;
