const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to,
            subject,
            text
        });
    } catch (error) {
        console.error('Email sending failed:', error);
    }
};

module.exports = sendEmail; 