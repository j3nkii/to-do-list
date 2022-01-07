const pg = require('pg');
const express = require('express');
const tasksRouter = express.Router();
const pool = new pg.Pool({
    database: 'tasks',
    host: 'localhost',
    port: 5432,
});


//Get Tasks endpoint
tasksRouter.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "tasks" ORDER BY "importance";';
    pool.query(queryText).then(result => {
    res.send(result.rows);
    })
    .catch(error => {
    console.log('error getting books', error);
    res.sendStatus(500);
    });
});



module.exports = tasksRouter;