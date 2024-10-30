import Models from "../classes/classModel";
import sch from "../schemas/payments";
const { imagesUploader } = require("../helpers/imagesUploader")
import { generate } from "../helpers/randGen";
import { updateStatusPaymentOnSchool } from "../helpers/masterFunction"
const { ValidationError, NotFoundError, ServerError, UnauthorizedError } = require("../classes/classRespons")

class paymentsModel extends Models{
    constructor(){
        super(sch)
    }

    async create(body, files){
        const {school_id, expired_date} = body
        if (files != null) {
            const newFilename = await imagesUploader(files.proof_of_payment, 'proof_of_payment/')
            body.proof_of_payment = newFilename
        }
        const invoice = await generate(5)
        body.invoice = invoice
        let resp = await this.model.create(this.convertParam(body, false))

        await updateStatusPaymentOnSchool(school_id, expired_date)
        return this.insert_result(resp)

    }

}

module.exports=paymentsModel