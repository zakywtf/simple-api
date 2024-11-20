import moment from 'moment'
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import Users from "../schemas/users";
import WellnessDetail from "../schemas/wellness_details";
import History from "../schemas/history";
import Recommendation from "../schemas/recommendations";
import Schools from "../schemas/schools";
import Payments from "../schemas/payments";

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
            model: "gemini-1.5-flash-001",
            // model: 'gemini-1.0-pro-001',
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const prompt = `workout planner untuk tinggi badan ${height}cm dan berat badan ${weight}kg dari senin sampai minggu`;
        console.log({prompt})
        const result = await model.generateContent(prompt);
        console.log({result})
        const text = result.response.text()

        await saveDataRecommendation(text, user_id, height, weight)
    }
}

const saveDataRecommendation = async (text, user_id, height, weight) => {
    console.log({text})
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

const groupingPayments = async (data) => {
    const result = [];
    data.reduce(function(res, v) {
        if (!res[v.x]) {
            res[v.x] = { x: v.x, y: 0};
            result.push(res[v.x])
        }
        res[v.x].y += v.y;
        return res;
    }, {});
    // console.log({result});
    return result
}

const getSales = async (cat, dmonth, dyear) => {
    const arr_revenue = []

    if (cat == 'year') {
        for (let i = 1; i <= 12; i++) {
            const month = i;
            const year = dyear;
            // const startDate = new Date(year, month);
            const endDate = new Date(year, month);
    
            const filters = {
                created_at: {
                    $gte: new Date(dyear+"-"+i+"-01"),
                    $lt: endDate,
                },
            };
            const payments = await Payments.find({isDeleted: false}).where(filters)
            if (payments.length > 0) {
                for (let k = 0; k < payments.length; k++) {
                    const e = payments[k];
                    arr_revenue.push({x: i, y: e.total_price})
                }
            } else {
                arr_revenue.push({x: i, y: 0})
            }
        }
    } else if (cat == 'month') {
        const endDate = new Date(dyear, dmonth);
        const filters = {
            created_at: {
                $gte: new Date(dyear+"-"+dmonth+"-01"),
                $lt: endDate,
            },
        };
        const payments = await Payments.find({isDeleted: false}).where(filters)
        if (payments.length > 0) {
            for (let k = 0; k < payments.length; k++) {
                const e = payments[k];
                arr_revenue.push({x: dmonth, y: e.total_price})
            }
        } else {
            arr_revenue.push({x: dmonth, y: 0})
        }
    }

    return arr_revenue
}

const yearlyRevenue = async () => {
    const d = new Date();
    let dmonth = d.getMonth()+1;
    let dyear = d.getFullYear();

    const datas = await getSales('year', dmonth, dyear)
    const grouping = await groupingPayments(datas)
    var total = 0

    for (let i = 0; i < grouping.length; i++) {
        const e = grouping[i];
        total += e.y
    }
    // console.log({total})

    return total
}

const lastYearReveneu = async () => {
    const d = new Date();
    let dmonth = d.getMonth();
    let dyear = d.getFullYear()-1;

    const datas = await getSales('year', dmonth, dyear)
    const grouping = await groupingPayments(datas)
    var total = 0

    for (let i = 0; i < grouping.length; i++) {
        const e = grouping[i];
        total += e.y
    }
    // console.log({total})

    return total
}

const monthlyRevenue = async () => {
    const d = new Date();
    let dmonth = d.getMonth()+1;
    let dyear = d.getFullYear();

    const datas = await getSales('month', dmonth, dyear)
    const grouping = await groupingPayments(datas)
    // console.log({tes2: grouping})

    return grouping[0].y
}

const lastMonthReveneu = async () => {
    const d = new Date();
    let dmonth = d.getMonth();
    let dyear = d.getFullYear();

    const datas = await getSales('month', dmonth, dyear)
    const grouping = await groupingPayments(datas)
    // console.log({tes2: grouping})

    return grouping[0].y
}

const percentageReveneue = async (newReveneu, lastRevenue) => {
    var percentage = 0
    var status = null

    if (lastRevenue == 0) {
        percentage = '100'
        status = 'up'
    } else {
        percentage = (((newReveneu - lastRevenue) / lastRevenue) * 100).toFixed(0)
        status = (percentage > 0) ? 'up' : 'down'
    }

    return { percentage, status }
}

module.exports = {
    createDefaultWellnessDetail,
    updateWellnessDetail,
    createHistory,
    getGeminiAI,
    saveDataRecommendation,
    updateStatusPaymentOnSchool,
    autoUnpaidSchools,
    autoSuspendSchools,
    yearlyRevenue,
    monthlyRevenue,
    lastYearReveneu,
    lastMonthReveneu,
    percentageReveneue
}