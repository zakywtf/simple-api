import Models from "../classes/classModel";
import sch from "../schemas/stores";
import { generate } from "../helpers/randGen";

class storesModel extends Models{
    constructor(){
        super(sch)
    }

    async insert(obj){
        const code = await generate(6)
        obj.code = code
        let resp = await this.model.create(this.convertParam(obj, false))

        return this.insert_result(resp)

    }

}

module.exports=storesModel