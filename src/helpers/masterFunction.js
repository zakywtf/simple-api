import Users from "../schemas/users";
import WellnessDetail from "../schemas/wellness_details";

const createDefaultWellnessDetail = async (body) => {
    console.log({body})
    const { _id, school_id } = body
    const resp = await WellnessDetail.create({ user_id: _id, school_id: school_id })

    return resp
}

module.exports = {
    createDefaultWellnessDetail
}