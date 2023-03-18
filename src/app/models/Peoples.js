const { Model, Sequelize } = require("sequelize");
const User = require("./Users");

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

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id" });
  }
}

module.exports = People;
