import Models from "../classes/classModel";
import sch from "../schemas/materials";

class materialsModel extends Models{
    constructor(){
        super(sch)
    }

    async insert(obj){
        obj.store_id = this.udata.store_id
        let resp = await this.model.create(this.convertParam(obj, false))

        return this.insert_result(resp)

    }
}

module.exports=materialsModel