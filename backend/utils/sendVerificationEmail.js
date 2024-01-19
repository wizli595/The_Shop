import nodemailer from "nodemailer";

const sendVerificationEmail = (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "SendinBlue", // Use your email service provider
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "abdoowizli@gmail.com",
      pass: "yqw8pI2x9nQNUmTJ",
    },
  });

  const mailOptions = {
    from: "abdoowizli@gmail.com",
    to: email,
    subject: "Account Verification",
    text: `Click the following link to verify your email: https://jawhara.onrender.com/api/users/verify/${verificationToken}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending verification email:", error);
    } else {
      console.log("Verification email sent: " + info.response);
    }
  });
};

export { sendVerificationEmail };
