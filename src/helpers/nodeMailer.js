import nodemailer from 'nodemailer';

const smtp = {
    // service: 'gmail',
    host:'smtp.office365.com',
    secure: false,
    port: '587',
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    debug: true,
    logger:true,
    sender:'"Email Service Beehivedrones" <service@beehivedrones.com>'
}

const transporter = nodemailer.createTransport(smtp);

module.exports = {
    sendMail: (mailOptions) => {
        if(!mailOptions.from) mailOptions.from=smtp.sender
        return transporter.sendMail(mailOptions);
    }
}