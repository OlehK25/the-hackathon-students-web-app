const { createTransport } = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendEmail = async (email, subject, payload, template) => {
  try {
    const transporter = createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf8");
    const compiledTemplate = handlebars.compile(source);

    const options = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: compiledTemplate(payload),
    };

    return transporter.sendMail(options);
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
