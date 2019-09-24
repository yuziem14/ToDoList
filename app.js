const path = require('path');
const express = require('express');
const auth = require('./Controllers/AuthController');

app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth.startSession);
app.use(auth.viewsSession);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'Views'));

/*  ---------------------------------------------------- 
                       App Routes
    ---------------------------------------------------- 
*/

app.get('/', (req, res) => {
  // res.writeHead(200, { 'Content-type': 'text/html' });
  // res.end('<h1>To Do List | Express Node.js</h1>');
  res.status(200).render('Auth/login');
});

const port = 5500;
app.listen(port, () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port} ...`);
});
