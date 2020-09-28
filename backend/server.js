const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors()); //app.use binds middleware to the express server
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully.");
})

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

/*
express: Express is a fast and lightweight web framework for Node.js. Express is an essential part of the MERN stack.

body-parser: Node.js body parsing middleware.

cors: CORS is a node.js package for providing an Express middleware that can be used to enable CORS with various options. Cross-origin resource sharing (CORS) is a
 mechanism that allows restricted resources on a web page to be requested from another domain outside the domain from which the first resource was served.
 
mongoose: A Node.js framework which lets us access MongoDB in an object-oriented way.
*/