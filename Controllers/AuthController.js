const session = require('express-session');
const usersModel = require('../Models/Users');

exports.startSession = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});

exports.viewsSession = (req, res, next) => {
  res.locals.session = req.session;
  next();
};

exports.allowAccess = (req, res, next) => {
  if (!req.session.user) return res.redirect('/login');
  res.locals.session = req.session;
  next();
};

exports.viewLogin = (req, res) => {
  if (req.session.user) return res.redirect('/tasks');

  res.status(200).render('Auth/login', { title: 'Login', email: '' });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  let message;
  let view;

  let user = usersModel.users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    view = 'Auth/login';
    message = 'Email ou senha inválidos!';
    res.status(401).render(view, { title: 'Login', message, email });
  } else {
    user = usersModel.readUserJSON(user.id);
    req.session.user = user;
    res.redirect('/tasks');
  }
};

exports.viewRegister = (req, res) => {
  res.status(200).render('Auth/register', { title: 'Registre-se', user: {} });
};

exports.register = (req, res) => {
  let view;
  const { name, email, password, confirmPass } = req.body;

  const errors = usersModel.validate(name, email, password, confirmPass);

  if (errors.errors()) {
    view = 'Auth/register';
    res
      .status(401)
      .render(view, { title: 'Registre-se', errors, user: { name, email } });
  } else {
    const user = {
      id: usersModel.lastId() + 1,
      name: name,
      email: email,
      password: password,
      tasks: []
    };

    usersModel.users.push({
      id: user.id,
      email: user.email,
      password: user.password
    });

    usersModel.saveJSON(user, err => {
      if (err) throw err;
      req.session.user = user;
      return res.redirect('/tasks');
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
