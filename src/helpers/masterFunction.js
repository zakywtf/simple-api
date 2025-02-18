import moment from 'moment'
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import Users from "../schemas/users";
import WellnessDetail from "../schemas/wellness_details";
import History from "../schemas/history";
import Recommendation from "../schemas/recommendations";
import MealsRecommendation from "../schemas/meals_recommendation";
import Schools from "../schemas/schools";
import Payments from "../schemas/payments";



const createDefaultWellnessDetail = async (obj) => {
    // console.log({obj})
    const { _id, school_id } = obj
    const resp = await WellnessDetail.create({ user_id: _id, school_id: school_id })

    return resp
}

const getCategoryBMI = async (objWeight, objHeight) => {
    const height = parseInt(objHeight)
    const weight = parseInt(objWeight)

    const bmi_score = weight / ((height/100)*(height/100))
    var bmi_category = null
    if (bmi_score < 18.50) {
        bmi_category = 'Kurang Berat Badan'
    } else if (bmi_score >= 18.51 && bmi_score < 24.90) {
        bmi_category = 'Normal'
    } else if (bmi_score >= 24.91 && bmi_score < 29.90) {
        bmi_category = 'Kelebihan Berat Badan'
    } else if (bmi_score >= 29.91){
        bmi_category = 'Obesitas'
    }

    return bmi_category

}

const updateWellnessDetail = async (obj, user_id) => {
    // console.log({obj, user_id})
    const height = parseInt(obj.height)
    const weight = parseInt(obj.weight)

    const bmi_score = weight / ((height/100)*(height/100))
    var bmi_category = null
    if (bmi_score < 18.50) {
        bmi_category = 'Kurang Berat Badan'
    } else if (bmi_score >= 18.51 && bmi_score < 24.90) {
        bmi_category = 'Normal'
    } else if (bmi_score >= 24.91 && bmi_score < 29.90) {
        bmi_category = 'Kelebihan Berat Badan'
    } else if (bmi_score >= 29.91){
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
    const status = (lastRecommendation != null) ? (lastRecommendation.weight == weight) ? true : false :false
    
    return status
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
                            description: "latihan yang harus di lakukan setiap harinya menggunakan istilah bahasa indonesia",
                            type: SchemaType.STRING,
                        },
                        set: {
                            description: "berapa set per latihan",
                            type: SchemaType.STRING,
                        },
                        repetisi: {
                            description: "berapa repetisi per set dengan satuan waktu atau kali",
                            type: SchemaType.STRING,
                        },
                        keterangan: {
                            description: "detail dan definisi dari latihan tersebut",
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
    console.log({isSameLastRecommendation})
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

        const prompt = `workout planner di rumah untuk tinggi badan ${height}cm dan berat badan ${weight}kg dari senin sampai minggu`;
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

const checkLastBloodPressure = async (height, weight, blood_pressure, user_id) => {
    const lastRecommendation = await MealsRecommendation.findOne({user_id: user_id}).sort({created_at: -1})
    const status = (lastRecommendation != null) ? (lastRecommendation.weight == weight && lastRecommendation.blood_pressure == blood_pressure) ? true : false :false
    
    return status
}

const schemaGemini2 = async () => {
    const schema = {
        description: "Meal Planner",
        type: SchemaType.ARRAY,
        items: {
          type: SchemaType.OBJECT,
          properties: {
            hari: {
              type: SchemaType.STRING,
              description: "hari",
              nullable: false,
            },
            makanan: {
                description: "makanan sehat setiap harinya",
                type: SchemaType.ARRAY,
                items: {
                    type: SchemaType.OBJECT,
                    properties: {
                        jenis: {
                            description: "jenis makanan untuk setiap harinya",
                            type: SchemaType.STRING,
                        },
                        keterangan: {
                            description: "keterangan dari jenis makanan",
                            type: SchemaType.STRING,
                        },
                    },
                    required: ["jenis",  "keterangan"]
                },
          },
        },
      }
    }

    return schema
}

const getGeminiAI2 = async (height, weight, blood_pressure, user_id) => {
    const isSameLastRecommendation = await checkLastBloodPressure(height, weight, blood_pressure, user_id)
    console.log({isSameLastRecommendation})
    if (isSameLastRecommendation == false) {
        const schema = await schemaGemini2()
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash-001",
            // model: 'gemini-1.0-pro-001',
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const prompt = `planner makanan per minggu untuk tinggi badan ${height}kg, berat badan ${weight}cm dan tekanan darah ${blood_pressure}mmHg dengan makanan yang umum di indonesia`;
        console.log({prompt})
        const result = await model.generateContent(prompt);
        console.log({result})
        const text = result.response.text()

        await saveDataMealsRecommendation(text, user_id, height, weight, blood_pressure)
    }
}

const saveDataMealsRecommendation = async (text, user_id, height, weight, blood_pressure) => {
    console.log({text})
    const array = JSON.parse(text)
    const meals = []
    for (let i = 0; i < array.length; i++) {
        const e = array[i];
        const meal = e.makanan
        const makanan = []
        for (let ii = 0; ii < meal.length; ii++) {
            const m = meal[ii];
            makanan.push({jenis: m.jenis, keterangan: m.keterangan})
        }
        meals.push({hari: e.hari, makanan})
    }

    await MealsRecommendation.create({user_id: user_id, meals, height: height, weight: weight, blood_pressure: blood_pressure})
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
    console.log({cat, dmonth, dyear})
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
            console.log({tahunan: filters})
            // const payments = await Payments.find({isDeleted: false})
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
        console.log({bulanan :filters})
        // const payments = await Payments.find({isDeleted: false})
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
    let dmonth = (d.getMonth() == 0) ? '12' : d.getMonth();
    let dyear = (d.getMonth() == 0) ? '2024' : d.getFullYear();

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

const countAge = (tanggalLahir) => {
    console.log({tanggalLahir})
    if (tanggalLahir) {
        let birthDate = new Date(tanggalLahir);
        let today = new Date();

        let usia = today.getFullYear() - birthDate.getFullYear();
        let bulan = today.getMonth() - birthDate.getMonth();
        let hari = today.getDate() - birthDate.getDate();

        // Jika bulan atau hari negatif, kurangi usia
        if (bulan < 0 || (bulan === 0 && hari < 0)) {
            usia--;
        }
        console.log({usia})
        return usia
    } else {
       return 0
    }
}

const ageCategory = async (date_of_birth) => {
    const age = await countAge(date_of_birth)
    var age_cat = ''
    if (age < 5) {
        age_cat = 'Balita'
    } else if (age >= 6 && age <= 13) {
        age_cat = 'Anak'
    } else if (age >= 14 && age <= 18) {
        age_cat = 'Remaja'
    } else if (age >= 19 && age <= 40) {
        age_cat = 'Dewasa'
    } else if (age >= 41 && age <= 60) {
        age_cat = 'Sangat Dewasa'
    } else if (age >= 61){
        age_cat = 'Lansia'
    }

    return age_cat
}

const catBloodPress = async (ageCat, bp) => {
    // const ageCat = await ageCategory(date_of_birth)
    var cat_blood_press = null
    if (ageCat == 'Balita') {
        cat_blood_press = (bp < 80) ? 'rendah' : (bp >= 80 && bp <= 115) ? 'normal' : (bp > 115) ? 'tinggi' : 'normal'
    } else if (ageCat == 'Anak') {
        cat_blood_press = (bp < 80) ? 'rendah' : (bp >= 80 && bp <= 120) ? 'normal' : (bp > 120) ? 'tinggi' : 'normal'
    } else if (ageCat == 'Remaja') {
        cat_blood_press = (bp < 90) ? 'rendah' : (bp >= 90 && bp <= 120) ? 'normal' : (bp > 120) ? 'tinggi' : 'normal'
    } else if (ageCat == 'Dewasa') {
        cat_blood_press = (bp < 95) ? 'rendah' : (bp >= 95 && bp <= 135) ? 'normal' : (bp > 135) ? 'tinggi' : 'normal'
    } else if (ageCat == 'Sangat Dewasa') {
        cat_blood_press = (bp < 110) ? 'rendah' : (bp >= 110 && bp <= 145) ? 'normal' : (bp > 145) ? 'tinggi' : 'normal'
    }  else if (ageCat == 'Lansia') {
        cat_blood_press = (bp < 95) ? 'rendah' : (bp >= 95 && bp <= 145) ? 'normal' : (bp > 145) ? 'tinggi' : 'normal'
    }

    return cat_blood_press
}

const conNormalBloodPress = async (ageCat) => {
    // const ageCat = await ageCategory(date_of_birth)
    var con_normal = null
    if (ageCat == 'Balita') {
        con_normal = '80-115'
    } else if (ageCat == 'Anak') {
        con_normal = '80-120'
    } else if (ageCat == 'Remaja') {
        con_normal = '90-120'
    } else if (ageCat == 'Dewasa') {
        con_normal = '95-135'
    } else if (ageCat == 'Sangat Dewasa') {
        con_normal = '110-145'
    }  else if (ageCat == 'Lansia') {
        con_normal = '95-145'
    }

    return con_normal
}

const conNormalTemperature = async (temp) => {
    const status = (temp < 35) ? 'Hipotermia' : (temp >= 35 && temp <= 37.5) ? 'Normal' : (temp > 37.5 && temp <= 40) ? 'Demam/hipertermia' : (temp > 40) ? 'Hiperpireksia' : 'Normal'
    return status
}

module.exports = {
    createDefaultWellnessDetail,
    updateWellnessDetail,
    createHistory,
    getGeminiAI,
    getGeminiAI2,
    saveDataRecommendation,
    updateStatusPaymentOnSchool,
    autoUnpaidSchools,
    autoSuspendSchools,
    yearlyRevenue,
    monthlyRevenue,
    lastYearReveneu,
    lastMonthReveneu,
    percentageReveneue,
    countAge,
    ageCategory,
    catBloodPress,
    conNormalBloodPress,
    conNormalTemperature,
    getCategoryBMI
}