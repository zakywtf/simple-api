import Models from "../classes/classModel";
import sch from "../schemas/menus";
const { imagesUploader } = require("../helpers/imagesUploader")
import { generate } from "../helpers/randGen";
const { ValidationError, NotFoundError, ServerError, UnauthorizedError } = require("../classes/classRespons")

class expenseModel extends Models{
    constructor(){
        super(sch)
    }

    async create(body, files){
        const {category} = body
        if (files != null) {
            const newFilename = await imagesUploader(files.picture, 'menus/')
            body.picture = newFilename
        } else {
            if (category == "food" || category == 'toping') {
                body.picture = "default.jpg"
            } else if (category == "drink") {
                body.picture = "default-drink.png"
            }
        }
        body.store_id = this.udata.store_id
        let resp = await this.model.create(this.convertParam(body, false))

        return this.insert_result(resp)

    }

}

module.exports=expenseModel