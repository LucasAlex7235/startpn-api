const Sequelize = require("sequelize");
const connectionDatabase = require("../config/database");
const Users = require("../app/models/Users");
const People = require("../app/models/Peoples");

const models = [People, Users];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(connectionDatabase);

    models.forEach((model) => model.init(this.connection));
    models.forEach(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

module.exports = new Database();
