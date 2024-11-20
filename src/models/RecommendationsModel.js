import Models from "../classes/classModel";
import sch from "../schemas/recommendations";
import History from "../schemas/history";
import { getGeminiAI } from "../helpers/masterFunction"

class recommendationsModel extends Models{
    constructor(){
        super(sch)
        this.sorting = { created_at: -1 }
    }

    async getAll(query={}){
        // console.log({udata: this.udata, query})
        const resp = await this.model.findOne({...query, user_id: this.udata._id}).sort(this.sorting)

        // console.log({resp})
        if(resp.length < 1) throw new NotFoundError('Data Not Found.')

        return { msg: 'Data retrieved.', data: resp}
    }

}

module.exports=recommendationsModel