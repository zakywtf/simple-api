import moment from 'moment'
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import Users from "../schemas/users";
import WellnessDetail from "../schemas/wellness_details";
import History from "../schemas/history";
import Recommendation from "../schemas/recommendations";

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

const getGeminiAI = async (height, weight) => {

}

const saveDataRecommendation = async (text, user_id=null) => {
    const array = JSON.parse(text)
    const planner = []
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        const activities = e.aktivitas
        const practices = []
        for (let ii = 0; ii < activities.length; ii++) {
            const activity = activities[ii];
            // console.log({activity})
            practices.push({name: activity.latihan, set: activity.set, repetitions: activity.repetisi, information: activity.keterangan})
        }
        // console.log({practices})
        planner.push({day: e.hari, practices})
    }

    await Recommendation.create({user_id: user_id, planner})
} 

module.exports = {
    createDefaultWellnessDetail,
    updateWellnessDetail,
    createHistory,
    getGeminiAI,
    saveDataRecommendation
}