const nodemailer = require('nodemailer');
require('dotenv').config()

const app_pass = process.env.APP_PASS;
const server_url = process.env.SERVER_URL;

function sendVerificationEmail(email, token) {
    console.log('sending mail to:' + email);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // Or another provider
        port: 465,
        secure: true,
        auth: {
            user: 'rufet.isr123@gmail.com',
            pass: app_pass, // Use an app-specific password for Gmail
        },
    });
    console.log(server_url);

    const verificationLink = `${server_url}/verify-email?token=${token}`;

    const mailOptions = {
        from: 'rufet.isr123@gmail.com',
        to: email,
        subject: 'Verify Your Email',
        html: `<p>Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}">${verificationLink}</a>`,
    };

    transporter.sendMail(mailOptions, async (err, info) => {
        if (err) {
            try {
                throw res.status(500).send(err.message);
            } catch (error) {
                console.log(error);

            }
        }
        else {
            console.log('Email sent successfully');

        }
    });
}


module.exports = sendVerificationEmail;