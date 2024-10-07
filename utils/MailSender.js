const nodemailer = require("nodemailer");

// require(dotenv).config();

const mailSender = async (email, title, body) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false,
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    let information = await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: title,
      text: body,
    });
    console.log(information);
    return information;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to send email");
  }
};

module.exports=mailSender;
