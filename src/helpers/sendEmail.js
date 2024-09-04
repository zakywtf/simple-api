import {sendMail} from "./nodeMailer"
import htmlSendPassword from "./htmlSendPassword"

const detailEmail = async (type = null, obj) => {
    switch (type) {
        case "send-password":
            const html = await htmlSendPassword(obj)
            const body = {
                to: obj.email,
                cc: [],
                subject: 'Credential Login System',
                html: html,
                attachments: []
            }
            await mailing(body)

            break;
    
        default:
            break;
    }
}

const mailing = async (body) => {
    // console.log({body});
    await sendMail({
        replyTo: process.env.EMAIL,
        ...body
    });
}

module.exports = {
    detailEmail
}