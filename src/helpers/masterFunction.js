import moment from 'moment'
import Users from "../schemas/users";
import WellnessDetail from "../schemas/wellness_details";
import History from "../schemas/history";

const createDefaultWellnessDetail = async (obj) => {
    // console.log({obj})
    const { _id, school_id } = obj
    const resp = await WellnessDetail.create({ user_id: _id, school_id: school_id })

    return resp
}

const updateWellnessDetail = async (obj, user_id) => {
    // console.log({obj, user_id})
    const body = { ...obj, updated_at: moment(), user_id: user_id}
    console.log({body})
    const resp = await WellnessDetail.findOneAndUpdate({ user_id: user_id },  { $set: body }, { returnNewDocument: true })
    
    return resp
}

const createHistory = async (obj) => {
    console.log({obj})

    const resp = await History.create({...obj, school_id: obj.user_id.school_id})

    return resp
}

module.exports = {
    createDefaultWellnessDetail,
    updateWellnessDetail,
    createHistory
}