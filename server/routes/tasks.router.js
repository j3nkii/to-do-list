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
    //add id? if else statment done / not done
    let queryText = 'SELECT * FROM "tasks" ORDER BY "dueBy" DESC;';
    pool.query(queryText).then(result => {
    res.send(result.rows);
    })
    .catch(error => {
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
    pool.query(queryText, queryParams)
        .then((bdRes) => {
            res.sendStatus(201) //created
        })
        .catch((err) => {
            console.log('failed:', err);
        });
});



tasksRouter.delete('/:id', (req, res) => {
    console.log('delte');
    const queryText = `DELETE FROM tasks WHERE id = $1 `; //SQL code here, use $1, $2 in conjunction with the query params
    let queryParams = [req.params.id];
    pool.query(queryText, queryParams).then((dbRes) => {
        res.sendStatus(204);
    }).catch((err) => {
        console.log('DELETE failed:', err);
    })
})



tasksRouter.put('/:id', (req, res) => {
    const queryText = `UPDATE tasks SET completed = $1, "dateCompleted" = $2 WHERE id = $3`
    let queryParams = [
        req.body.completed,
        req.body.dateCompleted,
        req.params.id
    ];
    pool.query(queryText, queryParams).then((dbRes) => {
        res.sendStatus(201)
    }).catch((err) => {
        console.log(err);
    })
})



module.exports = tasksRouter;