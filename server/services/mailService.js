const nodemailer = require("nodemailer");
require("dotenv").config();

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SNTP_HOST,
      service: "gmail",
      port: process.env.SNTP_PORT,
      secure: false,
      auth: {
        user: process.env.SNTP_USER,
        pass: process.env.SNTP_PASSWORD,
      },
    });
  }

  async sendActivationMail(to, Link) {
    await this.transporter.sendMail({
      from: process.env.SNTP_USER,
      to,
      subject: "Активация аккаунта на сайте " + process.env.CLIENT_URL,
      text: "",
      html: `
      <div> 
      <h1>Благодарим за регистрацию на сайте!</h1>
      <div>Для активации аккаунта в приложении Lingify перейдите по ссылке</div>
      <a href="${Link}">${Link}</a>
      <div>
      `,
    });
  }

  async sendResetPasswordMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SNTP_USER,
      to,
      subject: "Сброс пароля на сайте " + process.env.CLIENT_URL,
      text: "",
      html: `
      <div> 
      <h1>Здравствуйте!</h1>
      <h2>Вы запросили сброс пароля в приложении Lingify.</h2>
      <div>Для сброса пароля перейдите по ссылке</div>
      <a href="${link}">${link}</a>
      <div>
      `,
    });
  }

  async sendEmailSuccessChangedPassword(to) {
    await this.transporter.sendMail({
      from: process.env.SNTP_USER,
      to,
      subject: "Сброс пароля на сайте " + process.env.CLIENT_URL,
      text: "",
      html: `
      <div> 
      <h1>Здравствуйте!</h1>
      <h2>Вы успешно сбросили пароль для входа в приложение Lingify.</h2>
      <div>
      `,
    });
  }
}

module.exports = new MailService();
