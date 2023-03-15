const Sequelize = require("sequelize");
const connectionDatabase = require("../config/database");
const Users = require("../app/models/Users");
const People = require("../app/models/People");

const models = [People, Users];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(connectionDatabase);

    models.forEach((model) => model.init(this.connection));
  }
}

module.exports = new Database();
