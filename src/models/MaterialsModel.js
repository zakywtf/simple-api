import Models from "../classes/classModel";
import sch from "../schemas/materials";
import stocks from "../schemas/stocks";

class materialsModel extends Models{
    constructor(){
        super(sch)
    }

    async insert(obj){
        obj.store_id = this.udata.store_id
        let resp = await this.model.create(this.convertParam(obj, false))
        await this.saveInitStock(this.udata.store_id, resp._id)
        return this.insert_result(resp)

    }

    async saveInitStock(store_id, material_id){
        await stocks.create({store_id: store_id, material_id: material_id, amount: 0})
    }
}

module.exports=materialsModel