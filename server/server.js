// $ npm init --yes
// $ npm install express
// $ npm install pg
// $ npm install nodemon
// add .gitignore file and throw in     node_modules/
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
const tasksRouter = require('./routes/tasks.router');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.listen(PORT, () => {
    console.log('Server is running');
})

app.use('/tasks', tasksRouter);