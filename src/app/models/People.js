const { Model, Sequelize } = require("sequelize");

class People extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        address: Sequelize.STRING,
        telephone: Sequelize.STRING,
        type: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
  }
}

module.exports = People;
