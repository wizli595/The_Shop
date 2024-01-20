import nodemailer from "nodemailer";

const sendVerificationEmail = (email, verificationToken) => {
  const transporter = nodemailer.createTransport({
    service: "SendinBlue", // Use your email service provider
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "abdoowizli@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "Jawharatlghzal23@gmail.com",
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
const sendContactEmail = (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: "SendinBlue", // Use your email service provider
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: "abdoowizli@gmail.com",
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: "Jawharatlghzal23@gmail.com", // Set the email where you want to receive contact form submissions
    subject: "New Contact Form Submission",
    text: `
      Name: ${name}\n
      Email: ${email}\n
      Message:\n${message}
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending contact form email:", error);
    } else {
      console.log("Contact form email sent:", info.response);
    }
  });
};

export { sendVerificationEmail, sendContactEmail };
