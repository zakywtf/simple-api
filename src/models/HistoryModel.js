import Models from "../classes/classModel";
import sch from "../schemas/history";
import { updateWellnessDetail, createHistory, getGeminiAI } from "../helpers/masterFunction"

class historyModel extends Models{
    constructor(){
        super(sch)
        this.sorting = { created_at: -1 }
    }

    async create(obj){
        console.log({obj});
        const detail = await updateWellnessDetail(obj, this.udata._id)
        const body = { ...obj, school_id: detail.school_id }
        let resp = await this.model.create(this.convertParam(body, false))
        // await getGeminiAI(obj.height, obj.weight, this.udata._id)

        return this.insert_result(resp)
    }

    async getAll(query={}){
        // console.log({udata: this.udata, query})
        const resp = await this.model.find({...query, user_id: this.udata._id}).sort(this.sorting)

        // console.log({resp})
        if(resp.length < 1) throw new NotFoundError('Data Not Found.')

        return { msg: 'Data retrieved.', data: resp}
    }

}

module.exports=historyModel