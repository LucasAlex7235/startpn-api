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
      html: `<h3>Prezado(a) ${userExist.name},<h3/>
      <p>Gostaríamos de informar que foi solicitado o reset
       de sua senha em nosso sistema. Sabemos que este tipo 
       de procedimento pode ser desconfortável, mas estamos 
       prontos para ajudá-lo a recuperar o acesso à sua conta 
       de forma rápida e segura.<p/> 
      <p>Para concluir esse processo, basta clicar no link a seguir: 
      ${process.env.EMAIL_HOST_RESET_PASSWORT}/${userExist.id}. 
      Ao acessá-lo, você será direcionado(a) para uma página onde 
      poderá criar uma nova senha para a sua conta. Sugerimos que 
      escolha uma senha forte e segura, contendo letras maiúsculas 
      e minúsculas, números e símbolos.<p/> 
      <p>Caso você não tenha solicitado o reset de sua senha, 
      recomendamos que altere imediatamente a senha de sua conta, 
      como medida de segurança.<p/>
      <p>Estamos à disposição para qualquer dúvida ou suporte adicional.<p/>
      <p>Atenciosamente,<p/>
      <h4>Startpn.<h4/>`,
    });
    return res.status(200).json({ message: "Email enviado" });
  }
}

module.exports = ControllerSendEmailComponents;
