require("dotenv").config();

const server = require("./app");
server.listen(process.env.DB_PORT || 8000, () => {
  console.log("Servidor executando");
});
