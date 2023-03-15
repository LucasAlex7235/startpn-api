const { Router } = require("express");

const ControllerUser = require("./app/controllers/ControllerUserComponents");
const ControllerPeople = require("./app/controllers/ControllerPeopleComponents");

const MiddlewareUser = require("./app/middlewares/MiddlewareUser");
const AuthMiddleware = require("./app/middlewares/MiddlewareAuth");

const routes = Router();

/* USERS */
routes.post("/user", ControllerUser.createUser);
routes.get("/user", ControllerUser.getUsers);
routes.get("/user/:id", ControllerUser.getByIdUsers);
routes.patch("/user/:id", ControllerUser.updateUser);

/* LOGIN */

routes.post("/login", MiddlewareUser.validateLogin, ControllerUser.loginUser);

/* PEOPLE */

routes.get(
  "/people",
  AuthMiddleware.isAuthenticated,
  ControllerPeople.getPeoples
);
routes.post(
  "/people",
  AuthMiddleware.isAuthenticated,
  ControllerPeople.createPeople
);
routes.get(
  "/people/:id",
  AuthMiddleware.isAuthenticated,
  ControllerPeople.getByIdPeople
);
routes.patch(
  "/people/:id",
  AuthMiddleware.isAuthenticated,
  ControllerPeople.updatePeople
);
routes.delete(
  "/people/:id",
  AuthMiddleware.isAuthenticated,
  ControllerPeople.deletePeople
);

module.exports = routes;
