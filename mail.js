const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config();
const privateApi = process.env.API_KEY_MAILGUN;

const auth = {
    auth: {
        api_key: privateApi,
        domain: 'sandboxa2353885319b439199f66b120eacb608.mailgun.org'
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));


const sendMail = (email, subject, text, cb) => {
    const mailOptions = {
        from: email, // TODO replace this with your own email
        to: 'ezenxaanmeiji@gmail.com', // TODO: the receiver email has to be authorized for the free tier
        subject,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;