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

    async charts(){
        const arr_revenue = []
        
        const d = new Date();
        let dyear = d.getFullYear();
        
        for (let i = 1; i <= 12; i++) {
            const month = i;
            const year = dyear;
            // const startDate = new Date(year, month);
            const endDate = new Date(year, month);

            const filters = {
                created_at: {
                    $gte: new Date(dyear+"-"+i+"-01"),
                    $lt: endDate,
                },
            };
            // console.log({filters})
            const payments = await this.model.find({isDeleted: false}).where(filters)
            // console.log({payments})
            if (payments.length > 0) {
                for (let k = 0; k < payments.length; k++) {
                    const e = payments[k];
                    arr_revenue.push({x: i, y: e.total_price})
                }
            } else {
                arr_revenue.push({x: i, y: 0})
            }
        }

        const grouping = await this.groupingPayments(arr_revenue)
        const formarArr = await this.arrFormat(grouping)
        // return arr_revenue
        return { msg: 'Data revenue succesfully.', data: formarArr }

    }

    async groupingPayments(data) {
        const result = [];
        data.reduce(function(res, v) {
            if (!res[v.x]) {
                res[v.x] = { x: v.x, y: 0};
                result.push(res[v.x])
            }
            res[v.x].y += v.y;
            return res;
        }, {});
        // console.log({result});
        return result
    }

    async arrFormat(datas) {
        const arr = []
        for (let i = 0; i < datas.length; i++) {
            const e = datas[i];
            arr.push(e.y)
        }

        return arr
    }

}

module.exports=paymentsModel