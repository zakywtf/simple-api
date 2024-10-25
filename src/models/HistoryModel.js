import Models from "../classes/classModel";
import sch from "../schemas/history";
import { updateWellnessDetail, createHistory } from "../helpers/masterFunction"

class historyModel extends Models{
    constructor(){
        super(sch)
    }

    async create(obj){
        console.log({obj});
        const detail = await updateWellnessDetail(obj, this.udata._id)
        const body = { ...obj, school_id: detail.school_id }
        let resp = await this.model.create(this.convertParam(body, false))
        // await createHistory(detail)

        return this.insert_result(resp)
    }

}

module.exports=historyModel