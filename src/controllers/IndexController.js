const fetch = require('node-fetch');
const moment = require('moment-timezone');
// import moment from 'moment'
import apiResponse from "../helpers/apiResponse";
import mailer from "../helpers/nodeMailer";
import Users from "../schemas/users";

import { generate } from "../helpers/randGen";
import { detailEmail } from "../helpers/sendEmail"

const IndexController = {

    index: async (req, res) => {
        return apiResponse.successResponse(res, 'API Works!');

    },

    ping: async (req, res) => {
        return apiResponse.successResponse(res, 'Pong');

    },


    scanner: (req, res) => {
        res.render('scanner/index');

    },

    contactUs: async (req, res, next) => {
        const mailOptions = {
            from: req.body.name + ' <' + req.body.email + '>',
            to: 'novazaky1@gmail.com',
            subject: "Enquiry from " + req.body.name,
            text: req.body.message,
            html: `
                <p>Name: ${req.body.name}</p>
                <p>Email: ${req.body.email}</p>
                <p>${req.body.message}</p>
            `
        }

        try {
            let contact = new ContactUs(req.body);

            contact.save((err) => {
                if(err) return next(err);
            });

            await mailer.sendMail(mailOptions);

            return apiResponse.successResponse(res, 'Thank You. Our representative will contact you shortly.');
        } catch (error) {
            return next(error);
        }
    },

    reduceLimits: async (req, res) => {
        return apiResponse.successResponse(res, 'Key: '+req.query.key);
    },

    randString: (req, res) => {
        const rand = generate(80, false)
        return apiResponse.successResponseWithData(res, 'Random String', rand);
    },


    testSendEmail: async (req, res) => {
        const dataEmail = {
            name: "zaky",
            email: "novazaky1@gmail.com",
            password: "123456"
        }
        await detailEmail('send-password', dataEmail)    

    },

    testImt: async (req, res) => {
        const tb = 173
        const bb = 77
        const m = tb/100
        const imt = bb / Math.pow(m)

        return apiResponse.successResponseWithData(res, 'IMT', imt);

    },
    
}

module.exports = IndexController;