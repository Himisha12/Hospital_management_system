const nodemailer = require('nodemailer');

// Configure your email service (using Gmail example)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Set these in your .env file
    pass: process.env.EMAIL_PASS
  }
});

async function sendVerificationEmail(email, code) {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Doctor Registration Verification Code',
      text: `Your verification code is: ${code}\n\nThis code will expire in 10 minutes.`,
      html: `<p>Your verification code is: <strong>${code}</strong></p>
             <p>This code will expire in 10 minutes.</p>`
    };

    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send email' };
  }
}

module.exports = { sendVerificationEmail };