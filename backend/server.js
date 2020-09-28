const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { default: TodosList } = require('../src/components/todos-list');
const todoRoutes = express.Router();
const PORT = 4000;

app.use(cors()); //app.use binds middleware to the express server
app.use(bodyParser.json());
app.use('/todos', todoRoutes);

/*get list of all todos*/
todoRoutes.route('/').get(function(req, res) {
    Todo.find(function(err, todos) {
        if(err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
})

/*get a todo by id */
todoRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    Todo.findById(id, function(err, todo) {
        res.json(todo);
    });
});

/*add a todo */
todoRoutes.route('/add').post(function(req, res) {
    let todo = new Todo(req.body);
    todo.save()
        .then(todo => {
            res.status(200).json({'todo': 'todo added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new todo failed');
        });
});

/*update a todo*/
todoRoutes.route('/update/:id').post(function(req, res) {
    Todo.findById(req.params.id, function(err, todo) {
        if (!todo)
            res.status(404).send("data is not found");
        else
            todo.todo_description = req.body.todo_description;
            todo.todo_responsible = req.body.todo_responsible;
            todo.todo_priority = req.body.todo_priority;
            todo.todo_completed = req.body.todo_completed;

            todo.save().then(todo => {
                res.json('Todo updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});

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