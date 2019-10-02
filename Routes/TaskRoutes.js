/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require('express');
const taskController = require('../Controllers/TaskController');
const { allowAccess } = require('../Controllers/AuthController');

const router = express.Router();

/*  ----------------------------------------------------
                    Tasks Routes
    ----------------------------------------------------
*/

router
    .get('/', allowAccess, taskController.viewIndex)
    .get('/new', allowAccess, taskController.viewStore)
    .post('/new', allowAccess, taskController.store)
    .get('/:id/edit', allowAccess, taskController.viewEdit)
    .post('/:id/edit', allowAccess, taskController.edit)
    .get('/:id/concluded', allowAccess, taskController.taskConcluded)
    .get('/:id/delete', allowAccess, taskController.delete)
    .get('/:id', allowAccess, taskController.showTask);

module.exports = router;
