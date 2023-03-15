const User = require("../models/Users");

const bcrypt = require("bcrypt");

class MiddlewareUser {
  static async validateLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(401).json({ message: "Email e senha é obrigatório" });
    }
    try {
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return res.status(403).json({ message: "Email ou senha inválidos" });
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);

      if (!passwordMatch) {
        return res.status(403).json({ message: "Email ou senha inválidos" });
      } else {
        req.userId = user.id;
        next();
      }
    } catch (error) {
      console.error(error);
      res.status(403).json({ message: "Email ou senha invalidos" });
    }
  }
}

module.exports = MiddlewareUser;
