// Import 'dotenv' to load environment variables from a .env file
require('dotenv').config();

// Import mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Connect to the MongoDB database using the provided URI
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,           // Use new URL parser
    useUnifiedTopology: true,       // Use new server discovery and monitoring engine
})
.then(() => {
    console.log("DB Connected");    // Log successful database connection
})
.catch((err) => console.log(err));  // Log any errors that occur during connection
