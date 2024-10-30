import Models from "../classes/classModel";
import sch from "../schemas/payments";
const { imagesUploader } = require("../helpers/imagesUploader")
const { ValidationError, NotFoundError, ServerError, UnauthorizedError } = require("../classes/classRespons")

class paymentsModel extends Models{
    constructor(){
        super(sch)
    }

    async create(body, files){
        const {school_id} = body
        if (files != null) {
            const newFilename = await imagesUploader(files.proof_of_payment, 'public/proof_of_payment/')
            body.proof_of_payment = process.env.BASE_URL+'/proof_of_payment/'+newFilename
        }
        
        let resp = await this.model.create(this.convertParam(body, false))
        return this.insert_result(resp)

    }

}

module.exports=paymentsModel