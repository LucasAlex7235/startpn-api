require("dotenv").config();
const nodemailer = require("nodemailer");
const User = require("../models/Users");

class ControllerSendEmailComponents {
  static async sendEmail(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(401).json({ message: "Email obrigatório" });
    }

    const userExist = await User.findOne({ where: { email: email } });
    if (!userExist) {
      return res.status(401).json({ message: "Usuario não cadastrado" });
    }

    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      post: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    });

    transport.sendMail({
      from: `Startpn <${process.env.EMAIL_HOST_USER}>`,
      to: email,
      subject: "Resetar senha",
      html: `<h1>Resetar sua senha<h1/> <p>Olá, ${userExist.name}!<p/> <p>Click nesse link para resetar sua senha: ${process.env.EMAIL_HOST_RESET_PASSWORT}/${userExist.id}<p/>`,
    });
    return res.status(200).json({ message: "Email enviado" });
  }
}

module.exports = ControllerSendEmailComponents;
