const User = require('./user');

const db = {
  User
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = require('../utils/database');

module.exports = db;
