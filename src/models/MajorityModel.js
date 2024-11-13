import Models from "../classes/classModel";
import sch from "../schemas/majority";

class majorityModel extends Models{
    constructor(){
        super(sch)
    }

    async insert(obj){
        console.log({obj});
        let resp = await this.model.create(this.convertParam(obj, false))
        return this.insert_result(resp)
    }

    convertParam(body, updated=false){
        body.school_id=this.udata.school_id
        if(updated) body.updated_at=Date.now()
        return this.doConvertParam(body)
    }

}

module.exports=majorityModel