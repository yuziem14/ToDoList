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

exports.getLogin = (req, res) => {
  res.status(200).render('Auth/login', { title: 'Login' });
};

exports.getRegister = (req, res) => {
  res
    .status(200)
    .render('Auth/register', { title: 'Registre-se', usuario: {} });
};

exports.register = (req, res) => {
  let view;
  const { name, email, password, confirmPass } = req.body;

  const errors = usersModel.validate(name, email, password, confirmPass);
  console.log(errors);

  if (errors.errors() === true) {
    view = 'Auth/register';
    res
      .status(401)
      .render(view, { title: 'Registre-se', errors, usuario: { name, email } });
  } else {
    const user = {
      id: usersModel.lastId() + 1,
      name: name,
      email: email,
      password: password,
      tasks: []
    };

    usersModel.saveJSON(user, err => {
      if (err) throw err;

      view = 'Auth/login';
      req.session.user = user;
      res.status(200).render(view, { title: 'Home' });
    });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
