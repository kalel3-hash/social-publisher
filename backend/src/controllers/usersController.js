const users = require('../data/users');

exports.getUsers = (req, res) => {
  res.json(users);
};