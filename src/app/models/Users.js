const { Model, Sequelize } = require("sequelize");
// const bcrypt = require("bcrypt-nodejs");
const bcrypt = require("bcrypt");
// const bcrypt = require("sequelize-bcrypt");

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        password: Sequelize.STRING,
        email: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = User;

// hooks: {
//   beforeCreate: (user, options) => {
//     user.password = bcrypt.hashSync(user.password, 10);
//   },
//   beforeSave: (user, options) => {
//     user.password = bcrypt.hashSync(user.password, 10);
//   },
// },
