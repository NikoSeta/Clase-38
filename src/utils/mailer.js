const nodemailer = require('nodemailer');
const MAIL_ADM = require('../config/globals');
const CLIENT_ID = require('../config/globals');
const  CLIENT_SECRET = require('../config/globals');
const  REFRESH_TOKEN = require('../config/globals');
const  ACCES_TOKEN = require('../config/globals');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: `${MAIL_ADM}`,
        type: 'OAuth2',
        clientId: `${CLIENT_ID}`,
        clientSecret: `${CLIENT_SECRET}`,
        refreshToken: `${REFRESH_TOKEN}`,
        accessToken: `${ACCES_TOKEN}`
    }
});

const mailOptions = {
    from: 'Servidor de node.js',
    to: `${MAIL_ADM}`,
    subject: 'Nuevo usuario',
    html:'<h1 style="margin-top: 35px;text-align: center;color:#ffc107;background-color: #212529;padding-bottom: 8px;border-radius: 10px;">Nuevo usuario creado</h1>'
}

async function sendEmail() {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(info);
    } catch (error) {
        console.log(error);
    }
}

module.exports = sendEmail()