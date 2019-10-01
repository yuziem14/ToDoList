/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
const express = require('express');
const taskController = require('../Controllers/TaskController');
const { allowAccess } = require('../Controllers/AuthController');

const router = express.Router();

/*  ----------------------------------------------------
                Taks Routes
    ----------------------------------------------------
*/

router
    .get('/', allowAccess, taskController.viewIndex)
    .get('/:id/show', allowAccess, taskController.showTask)
    .get('/store', allowAccess, taskController.viewStore)
    .post('/store', allowAccess, taskController.store)
    .get('/:id/edit', allowAccess, taskController.viewEdit)
    .post('/:id/edit', allowAccess, taskController.edit)
    .get('/:id/concluded', allowAccess, taskController.taskConcluded)
    .get('/:id/delete', allowAccess, taskController.delete);

module.exports = router;
