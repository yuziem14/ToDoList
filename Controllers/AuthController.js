const session = require('express-session');

exports.startSession = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
});

exports.viewsSession = (req, res, next) => {
  res.locals.session = req.session;
  next();
};
