require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const compression = require("compression");
require("./database/index");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(compression());
    this.server.use(express.json({ limit: "500mb" }));
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
