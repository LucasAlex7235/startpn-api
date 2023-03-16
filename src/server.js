require("dotenv").config();

const server = require("./app");
server.listen(3000, () => {
  console.log("Servidor executando");
});
