const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class ControllerUserComponents {
  static async getUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar usuários." });
    }
  }

  static async getByIdUsers(req, res) {
    const id = req.params.id;
    try {
      const users = await User.findByPk(id);
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
  }

  static async loginUser(req, res) {
    const user = req.body;
    const token = jwt.sign(
      {
        name: user.name,
        id: user.id,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
        subject: String(req.userId),
      }
    );
    return res.status(200).json({ token: token });
  }

  static async createUser(req, res) {
    let { name, email, password } = req.body;

    password = bcrypt.hashSync(password, 10);

    const userExist = await User.findOne({ where: { email: email } });
    if (userExist) {
      return res.status(401).json({ message: "Email já existente" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    delete user.dataValues.password;

    return res.status(201).json(user);
  }

  static async updateUser(req, res) {
    const userBody = req.body;
    const id = req.params.id;
    const { password } = userBody;

    try {
      const user = await User.findByPk(id);
      Object.assign(user, userBody);
      password ? (user.password = bcrypt.hashSync(password, 10)) : "";
      await user.save();

      delete user.dataValues.password;

      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao atualizar usuário." });
    }
  }
}

module.exports = ControllerUserComponents;
