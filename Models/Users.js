const path = require('path');
const fs = require('fs');

let users;
const usersFiles = path.join(__dirname, '..', 'files', 'Users');

exports.usersFiles = usersFiles;

exports.lastId = () => {
  let id = -1;
  users.forEach(u => {
    // eslint-disable-next-line prefer-destructuring
    if (u.id > id) id = u.id;
  });

  return id;
};

exports.validate = (name, email, password, confirmPass, edit = false) => {
  const errors = {
    name: [],
    email: [],
    password: [],
    confirmPass: [],
    errors: function() {
      return (
        this.name.length > 0 ||
        this.email.length > 0 ||
        this.password.length > 0 ||
        this.confirmPass.length > 0
      );
    }
  };

  if (!name || name.trim().length === 0 || name.trim().length < 4)
    errors.name.push(
      'Por favor, informe seu nome! O campo deve ter ao menos 4 caracteres!'
    );

  if (!email || email.trim().length === 0 || email.trim().length < 8)
    errors.email.push(
      'Por favor, informe seu e-mail! O campo deve ter ao menos 8 caracteres!'
    );

  if (!edit) {
    if (
      !password ||
      password.trim().length === 0 ||
      password.trim().length < 3
    ) {
      errors.password.push(
        'Por favor, informe a sua senha. O campo deve ter ao menos 3 caracteres'
      );
    }
    if (!confirmPass) {
      errors.confirmPass.push('Por favor, confirme a sua senha.');
    }
  }

  if (password !== confirmPass) {
    errors.confirmPass.push('A senha informada não é igual à confirmação.');
  }

  return errors;
};

exports.saveJSON = (user, callback) => {
  const file = path.join(usersFiles, `user-${user.id}.json`);

  users.push({ id: user.id, email: user.email, password: user.password });
  fs.writeFile(
    path.join(usersFiles, 'users.json'),
    JSON.stringify(users),
    'utf-8',
    err => {
      if (err) throw err;
    }
  );

  const userString = JSON.stringify(user);
  fs.writeFile(file, userString, 'utf-8', callback);
};

exports.readUserJSON = id => {
  const file = path.join(usersFiles, `user-${id}.json`);
  const userString = fs.readFileSync(file, 'utf-8');
  const user = JSON.parse(userString);

  return user;
};

const readJSON = () => {
  const file = path.join(usersFiles, 'users.json');
  const string = fs.readFileSync(file, 'utf-8');
  const usersJSON = JSON.parse(string);

  return usersJSON;
};

users = readJSON();
exports.users = users;
