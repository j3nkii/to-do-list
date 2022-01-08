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
    let queryText = 'SELECT * FROM "tasks" WHERE "completed" = FALSE ORDER BY "importance";';
    pool.query(queryText).then(result => {
    res.send(result.rows);
    })
    .catch(error => {
    console.log('error getting books', error);
    res.sendStatus(500);
    });
});


tasksRouter.post('/', (req, res) => {
    //console.log(req.body);
    const queryText = `
    INSERT INTO tasks 
    ("task", "importance", "dueBy")
    VALUES ($1, $2, $3);` //SQL code here, use $1, $2 in conjunction with the query params
    let queryParams = [
        req.body.package.task,
        req.body.package.importance,
        req.body.package.dueBy
    ];
    console.log(queryParams);
    pool.query(queryText, queryParams)
        .then((bdRes) => {
            res.sendStatus(201) //created
        })
        .catch((err) => {
            console.log('failed:', err);
        });
});



tasksRouter.delete('/:id', (req, res) => {
    console.log(req.params)
    const queryText = `DELETE FROM tasks WHERE id = $1 `; //SQL code here, use $1, $2 in conjunction with the query params
    let queryParams = [req.params.id];
    pool.query(queryText, queryParams).then((dbRes) => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log('DELETE failed:', err);
    })
})



module.exports = tasksRouter;