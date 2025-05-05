import m from 'mongoose';
import apiResponse from "../helpers/apiResponse";
import { ValidationError, NotFoundError, ServerError, UnauthorizedError } from "./classRespons"

class Models {
    constructor(model){
        this.model = model
        this.udata=false
        this.sorting={}
    }

    setUdata(udata){
        this.udata=udata
    }

    async getAll(query={}){
        // console.log({udata: this.udata, query})
        const resp = await this.model.find({...query, isDeleted: false}).sort(this.sorting)

        // console.log({resp})
        if(resp.length < 1) throw new NotFoundError('Data Not Found.')

        return { msg: 'Data retrieved.', data: resp}
    }

    async getByValue(body){
        const resp = await this.model.findOne(body,this.getProjection())
        if(resp.length < 1) throw new NotFoundError('Data Not Found.')

        return { msg: 'Data retrieved.', data: resp}
    }

    async getById(id){
        const resp = await this.model.findById(id,this.getProjection())
        if(resp == null) throw new NotFoundError('Data Not Found.')

        return { msg: 'Data retrieved.', data: resp}
    }

    doConvertParam(body){
        return body
    }
    convertParam(body, updated=false){
        body.user_id=this.udata._id
        if(updated) body.updated_at=Date.now()
        return this.doConvertParam(body)
    }

    convertParamDeleted(body, deleted=false){
        // console.log({body})
        body.isDeleted=true, body.deleted_at=Date.now()
        return this.doConvertParam(body)
    }
    insert_result(resp){
        return { msg: 'Data added succesfully.', data: resp }
    }

    update_result(resp){
        // return resp
        return { msg: 'Data updated succesfully.', data: resp }
    }

    delete_result(resp){
        // return resp
        return { msg: 'Data delete succesfully.', data: resp}

    }

    processFilter(filter){
        return filter
    }

    getProjection(){
        return ''
    }

    async insert(obj){
        // console.log({obj});
        let resp = await this.model.create(this.convertParam(obj, false))
        return this.insert_result(resp)
    }

    async update(id, obj){
        let resp = await this.model.findByIdAndUpdate(id.id, this.convertParam(obj, true))
        const data = await this.model.findById(id.id,this.getProjection())

        return this.update_result(data)
    }

    async delete(id, obj){
        let resp = await this.model.findByIdAndUpdate(id.id, this.convertParamDeleted(obj, true))
        return this.delete_result(resp)
    }

    async paging(limit, offset, filter, sort, select=''){
        // console.log({limit, offset, filter, sort, select})
        const results = await this.model.find(this.processFilter(filter), this.getProjection(),{skip:parseInt(offset), limit:parseInt(limit), sort:sort}).select(select);
        const total = await this.model.countDocuments(filter);
        // console.log({results, total})
        // return {results, total}
        return { msg: 'Data retrieved.', data: { datas: results, total: total }}

    }
}

module.exports = Models