/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
const tasksModel = require('../Models/Tasks');
const usersModel = require('../Models/Users');

exports.viewIndex = (req, res) => {
    const tasks = {
        concluded: [],
        notConcluded: []
    }

    let userTasks = req.session.user.tasks.slice();
    userTasks = userTasks.sort((task1, task2) => task2.id - task1.id);

    userTasks.forEach(t => {
        if (t.concluded === true)
            tasks.concluded.push(t);
        else
            tasks.notConcluded.push(t);
    });

    res.status(200).render('Tasks/index', { title: 'Tasks', tasks });
}

exports.showTask = (req, res) => {
    const id = req.params.id * 1;
    const { user } = req.session;

    const task = user.tasks.find(t => t.id === id);

    if (task === undefined) {
        return res.redirect('/tasks');
    }

    res.status(200).render('Tasks/show', { title: 'View Task', task });
}

exports.viewStore = (req, res) => {
    res.status(200).render('Tasks/store', { title: 'New Task', task: {} });
}

exports.store = (req, res) => {
    let view;
    const json = {};
    const { title, description } = req.body;
    const errors = tasksModel.validate(title);

    console.log(errors);

    if (errors.errors()) {
        view = 'Tasks/store';
        json.title = 'New Task';
        json.task = { description, title };
        json.errors = errors;

        res.status(401).render(view, json);
    } else {
        view = 'Tasks/index';
        json.title = 'Tasks';

        const { user } = req.session;
        const newTask = {
            id: tasksModel.lastId(req.session.user) + 1,
            title: title,
            description: description,
            concluded: false
        }

        user.tasks.push(newTask);

        usersModel.saveUserJSON(user, err => {
            if (err) throw err;
            res.redirect('/tasks');
        });
    }
}

exports.viewEdit = (req, res) => {
    const id = req.params.id * 1;
    const task = req.session.user.tasks.find(t => t.id === id);

    if (id === undefined || task === undefined || task.concluded === true) return res.redirect('/tasks');

    res.status(200).render('Tasks/edit', { title: 'Edit Task', task });
}

exports.edit = (req, res) => {
    const id = req.params.id * 1;
    const { user } = req.session;
    const task = user.tasks.find(t => t.id === id);

    if (id === undefined || task === undefined || task.concluded === true) return res.redirect('/tasks');

    const { title, description } = req.body;
    const errors = tasksModel.validate(title);

    if (errors.errors()) {
        res.status(401).render('Tasks/edit', { title: 'Edit Task', task, errors });
    } else {
        const taskIndex = user.tasks.indexOf(task);
        user.tasks[taskIndex].title = title;
        user.tasks[taskIndex].description = description;

        usersModel.saveUserJSON(user, err => {
            if (err) throw err;
        });

        res.status(200).render('Tasks/edit', { title: 'Edit Task', task });
    }

};

exports.taskConcluded = (req, res) => {
    const id = req.params.id * 1;
    const { user } = req.session;
    const task = user.tasks.find(t => t.id === id);

    const taskIndex = user.tasks.indexOf(task);
    user.tasks[taskIndex].concluded = !user.tasks[taskIndex].concluded;

    usersModel.saveUserJSON(user, err => {
        if (err) throw err;
        res.redirect('/tasks');
    });
}

exports.delete = (req, res) => {
    const id = req.params.id * 1;
    const { user } = req.session;
    const task = user.tasks.find(t => t.id === id);

    if (task !== undefined) {
        const taskIndex = user.tasks.indexOf(task);
        user.tasks.splice(taskIndex, 1);
        usersModel.saveUserJSON(user, err => {
            if (err) throw err;

            res.redirect('/tasks');
        });
    } else {
        res.redirect('/tasks');
    }
}