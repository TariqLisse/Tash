// Import and set up MongoDB connection
require('./config/db');

// Create an instance of Express
const app = require('express')();
const port = 3000; // Port number for server

// Import UserRouter from the API directory
const UserRouter = require('./api/User');

// Import bodyParser middleware to parse JSON data from requests
const bodyParser = require('express').json;
app.use(bodyParser());

// Route configuration: Use UserRouter for routes starting with '/user'
app.use('/user', UserRouter);

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
