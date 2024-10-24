const nodemailer = require('nodemailer');

const sendEmailVerification = async (userEmail, token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'noreply@example.com',
        to: userEmail,
        subject: 'Email Verification',
        text: `Click the link to verify your email: ${process.env.BASE_URL}/verify-email?token=${token}`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmailVerification };
