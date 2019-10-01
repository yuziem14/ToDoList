/* eslint-disable no-undef */
const path = require('path');
const express = require('express');
const authController = require('./Controllers/AuthController');
const authRouter = require('./Routes/AuthRoutes');
const taskRouter = require('./Routes/TaskRoutes');

app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authController.startSession);
app.use(authController.viewsSession);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'Views'));

/*  ---------------------------------------------------- 
                       App Routes
    ---------------------------------------------------- 
*/

app.use('/', authRouter);
app.use('/tasks', taskRouter);

const port = 5500;
app.listen(port, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port} ...`);
});
