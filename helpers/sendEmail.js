const nodemailer = require("nodemailer");
const config = require("config");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: config.get("email"),
        pass: config.get("email_password"),
      },
    });
    const mailOptions = {
      from: config.get("email"),
      to,
      subject,
      text,
    };
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Could not send email");
  }
};
module.exports = sendEmail;

// Send OTP via email
