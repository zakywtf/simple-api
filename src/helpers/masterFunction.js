import moment from 'moment'
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import Users from "../schemas/users";
import WellnessDetail from "../schemas/wellness_details";
import History from "../schemas/history";
import Recommendation from "../schemas/recommendations";
import Schools from "../schemas/schools";

const createDefaultWellnessDetail = async (obj) => {
    // console.log({obj})
    const { _id, school_id } = obj
    const resp = await WellnessDetail.create({ user_id: _id, school_id: school_id })

    return resp
}

const updateWellnessDetail = async (obj, user_id) => {
    // console.log({obj, user_id})
    const height = parseInt(obj.height)
    const weight = parseInt(obj.weight)

    const bmi_score = weight / ((height/100)*(height/100))
    var bmi_category = null
    if (bmi_score < 18.5) {
        bmi_category = 'Kurang Berat Badan'
    } else if (bmi_score >= 18.5 && bmi_score < 24.9) {
        bmi_category = 'Normal'
    } else if (bmi_score >= 25 && bmi_score < 29.9) {
        bmi_category = 'Kelebihan Berat Badan'
    } else {
        bmi_category = 'Obesitas'
    }

    const body = { ...obj, updated_at: moment(), user_id: user_id, bmi_score: bmi_score.toFixed(2), bmi_category: bmi_category}
    console.log({body})
    const resp = await WellnessDetail.findOneAndUpdate({ user_id: user_id },  { $set: body }, { returnNewDocument: true })
    
    return resp
}

const createHistory = async (obj) => {
    const resp = await History.create({...obj, school_id: obj.user_id.school_id})

    return resp
}

const checkLastHeighAndWeight = async (height, weight, user_id) => {
    const lastRecommendation = await Recommendation.findOne({user_id: user_id}).sort({created_at: -1})
    if (lastRecommendation.weight == weight) {
        return true
    } else {
        return false
    }
}

const schemaGemini = async () => {
    const schema = {
        description: "Workout Planner",
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            hari: {
              type: SchemaType.STRING,
              description: "hari",
              nullable: false,
            },
            aktivitas: {
                description: "latihan yang harus di lakukan setiap harinya",
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        latihan: {
                            description: "latihan yang harus di lakukan setiap harinya",
                            type: SchemaType.STRING,
                        },
                        set: {
                            description: "berapa set per latihan",
                            type: SchemaType.STRING,
                        },
                        repetisi: {
                            description: "berapa repetisi per set",
                            type: SchemaType.STRING,
                        },
                        keterangan: {
                            description: "keterangan dari latihan",
                            type: SchemaType.STRING,
                        },
                    },
                    required: ["latihan", "set", "repetisi", "keterangan"]
                },
          },
        },
      }
    }

    return schema
}

const getGeminiAI = async (height, weight, user_id) => {
    const isSameLastRecommendation = await checkLastHeighAndWeight(height, weight, user_id)
    if (isSameLastRecommendation == false) {
        const schema = await schemaGemini()
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-pro",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const prompt = `workout planner untuk tinggi badan ${height}cm dan berat badan ${weight}kg dari senin sampai minggu`;

        const result = await model.generateContent(prompt);
        // console.log({result})
        const text = result.response.text()

        await saveDataRecommendation(text, user_id, height, weight)
    }
}

const saveDataRecommendation = async (text, user_id, height, weight) => {
    const array = JSON.parse(text)
    const planner = []
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        const activities = e.aktivitas
        const practices = []
        for (let ii = 0; ii < activities.length; ii++) {
            const activity = activities[ii];
            practices.push({name: activity.latihan, set: activity.set, repetitions: activity.repetisi, information: activity.keterangan})
        }
        planner.push({day: e.hari, practices})
    }

    await Recommendation.create({user_id: user_id, planner, height: height, weight: weight})
} 

const updateStatusPaymentOnSchool = async (school_id, expired_date) => {
    const data = await Schools.findOne({_id: school_id})
    data.status = 'active'
    data.expired_date = expired_date

    await data.save()
    const user = await Users.updateMany({ school_id: school_id }, {$set:{status: 'active', isExpired: false}})
}

const autoUnpaidSchools = async () => {
    const start = moment().startOf('day').toDate()
    const end = moment().startOf('day').add(1, 'day').toDate()
    const suspend_date = moment().startOf('day').add(10, 'day').toDate()

    const schools = await Schools.find({expired_date: {$gte: start, $lt: end}, status: 'active'})
    if (schools.length > 0) {
        for (let i = 0; i < schools.length; i++) {
            const sch = schools[i];
            const sch_id = sch._id
            const user = await Users.updateMany({ school_id: sch_id }, {$set:{status: 'unpaid', isExpired: true}})
        }
    
        await Schools.updateMany({expired_date: {$gte: start, $lt: end}, status: 'active' },{ $set: {status: 'unpaid', suspend_date: suspend_date}})
    }
}

const autoSuspendSchools = async () => {
    const start = moment().startOf('day').toDate()
    const end = moment().startOf('day').add(1, 'day').toDate()

    const schools = await Schools.find({suspend_date: {$gte: start, $lt: end}, status: 'unpaid'})
    if (schools.length > 0) {
        for (let i = 0; i < schools.length; i++) {
            const sch = schools[i];
            const sch_id = sch._id
            const user = await Users.updateMany({ school_id: sch_id }, {$set:{status: 'suspend'}})
        }

        await Schools.updateMany({suspend_date: {$gte: start, $lt: end}, status: 'unpaid' },{ $set: {status: 'suspend'}})
    }
}

module.exports = {
    createDefaultWellnessDetail,
    updateWellnessDetail,
    createHistory,
    getGeminiAI,
    saveDataRecommendation,
    updateStatusPaymentOnSchool,
    autoUnpaidSchools,
    autoSuspendSchools
}