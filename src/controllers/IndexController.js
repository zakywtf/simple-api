const fetch = require('node-fetch');
const moment = require('moment-timezone');
// import moment from 'moment'

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import OpenAI from 'openai';
import apiResponse from "../helpers/apiResponse";
import mailer from "../helpers/nodeMailer";
import Users from "../schemas/users";
import Schools from "../schemas/schools";
import Stores from "../schemas/stores";
import Devices from "../schemas/devices";
import History from "../schemas/history";
import WellnessDetail from "../schemas/wellness_details";
import Payments from "../schemas/payments";
import Majority from "../schemas/majority";

import { generate } from "../helpers/randGen";
import { detailEmail } from "../helpers/sendEmail"
import { saveDataRecommendation, yearlyRevenue, monthlyRevenue, lastYearReveneu, lastMonthReveneu, percentageReveneue, getGeminiAI, getGeminiAI2, ageCategory, catBloodPress, conNormalBloodPress, conNormalTemperature, getCategoryBMI } from "../helpers/masterFunction"

const IndexController = {

    index: async (req, res) => {
        return apiResponse.successResponse(res, 'API Works!');

    },

    ping: async (req, res) => {
        return apiResponse.successResponse(res, 'Pong');

    },


    scanner: (req, res) => {
        res.render('scanner/index');

    },

    contactUs: async (req, res, next) => {
        const mailOptions = {
            from: req.body.name + ' <' + req.body.email + '>',
            to: 'novazaky1@gmail.com',
            subject: "Enquiry from " + req.body.name,
            text: req.body.message,
            html: `
                <p>Name: ${req.body.name}</p>
                <p>Email: ${req.body.email}</p>
                <p>${req.body.message}</p>
            `
        }

        try {
            let contact = new ContactUs(req.body);

            contact.save((err) => {
                if(err) return next(err);
            });

            await mailer.sendMail(mailOptions);

            return apiResponse.successResponse(res, 'Thank You. Our representative will contact you shortly.');
        } catch (error) {
            return next(error);
        }
    },

    reduceLimits: async (req, res) => {
        return apiResponse.successResponse(res, 'Key: '+req.query.key);
    },

    randString: (req, res) => {
        const rand = generate(80, false)
        return apiResponse.successResponseWithData(res, 'Random String', rand);
    },


    testSendEmail: async (req, res) => {
        const dataEmail = {
            name: "zaky",
            email: "novazaky1@gmail.com",
            password: "123456"
        }
        await detailEmail('send-password', dataEmail)    

    },

    testImt: async (req, res) => {
        const tb = 173
        const bb = 77
        const m = tb/100
        const imt = bb / Math.pow(m)

        return apiResponse.successResponseWithData(res, 'IMT', imt);

    },

    loginPage: async (req, res) => {
        res.render('auth/login');
    },

    registerPage: async (req, res) => {
        res.render('auth/register');
    },

    dashboard: async (req, res) => {
        let data
        let total_cashier = 0
        let total_owner = 0
        let total_stores = 0
        let schools_unpaid = []
        let total_kurus = 0
        let total_normal = 0
        let total_gemuk = 0
        let total_obesitas = 0
        let cat_bp = 'normal'
        let cat_os = 'normal'
        let revenue_yearly = 0
        let revenue_monthly = 0
        let percentage_yearly_revenue = {}
        let percentage_monthly_revenue = {}
        let old = ''
        let broca = '-'
        let total_male = 0
        let total_female = 0
        let age_cat = 'Dewasa'
        let con_normal_bp = '-'
        let con_normal_temp  = '-'

        const d = new Date();
        let dyear = d.getFullYear();
        const startOfDay = moment().startOf("day").toDate(); // 00:00:00
        const endOfDay = moment().endOf("day").toDate();

        if (req.session.role == 'user') {
            data = await WellnessDetail.findOne({user_id: req.session.user_id})
            const blood_pressure = (data) ? data.blood_pressure : null
            const split_bp = (blood_pressure) ? blood_pressure.split("/") : '0'
            const bp = parseInt(split_bp[0])
            const os = (data) ? parseInt(data.oxygen_saturation) : 120
            // console.log({bp, os})
            // cat_bp = (bp <= 120 && bp > 90) ? 'normal' : (bp > 120) ? 'tinggi' : (bp <= 90) ? 'rendah' : 'normal'
            cat_os = (os >= 95) ? 'normal' : (os < 95 && os >= 80) ? 'rendah' : (os < 80) ? 'sangat_rendah' : 'normal'
            const resp = await History.findOne({user_id: req.session.user_id}).sort({created_at: -1})
            // console.log({resp})
            // console.log({session: req.session})
            if (resp != null) {
                await getGeminiAI(resp.height, resp.weight, req.session.user_id)
                await getGeminiAI2(resp.height, resp.weight, resp.blood_pressure, req.session.user_id)
            }
            old = await countOld(req.session.date_of_birth)
            broca = await countBroca(data.height, req.session.gender)
            age_cat = await ageCategory(req.session.date_of_birth)
            cat_bp = await catBloodPress(age_cat, bp)
            con_normal_bp = await conNormalBloodPress(age_cat)
            con_normal_temp = await conNormalTemperature(data.temperature)
        } else if (req.session.role == 'developer'){
            total_cashier = await Users.find({isDeleted: false, role: 'cashier'}).countDocuments()
            total_owner = await Users.find({isDeleted: false, role: 'owner'}).countDocuments()
            total_stores = await Stores.find({isDeleted: false}).countDocuments()
            const stores = await Stores.find({isDeleted: false, status: "unpaid"})
            for (let i = 0; i < stores.length; i++) {
                const sch = stores[i];
                stores_unpaid.push({code: sch.code, name: sch.name, status: sch.status})
            }
            revenue_yearly = await yearlyRevenue()
            revenue_monthly = await monthlyRevenue()
            var last_year_reveneu = await lastYearReveneu()
            var last_month_reveneu = await lastMonthReveneu()
            // console.log({revenue_yearly, last_year_reveneu, revenue_monthly, last_month_reveneu})
            percentage_yearly_revenue =  await percentageReveneue(revenue_yearly, last_year_reveneu)
            percentage_monthly_revenue =  await percentageReveneue(revenue_monthly, last_month_reveneu)
            // console.log({percentage_yearly_revenue, percentage_monthly_revenue})
        } else if (req.session.role == 'teacher'){
            total_kurus = await WellnessDetail.find({isDeleted: false, school_id: req.session.school_id, bmi_category: 'Kurang Berat Badan'}).countDocuments()
            total_normal = await WellnessDetail.find({isDeleted: false, school_id: req.session.school_id, bmi_category: 'Normal'}).countDocuments()
            total_gemuk = await WellnessDetail.find({isDeleted: false, school_id: req.session.school_id, bmi_category: 'Kelebihan Berat Badan'}).countDocuments()
            total_obesitas = await WellnessDetail.find({isDeleted: false, school_id: req.session.school_id, bmi_category: 'Obesitas'}).countDocuments()
            total_male = await Users.find({isDeleted: false, school_id: req.session.school_id, gender: 'male'}).countDocuments()
            total_female = await Users.find({isDeleted: false, school_id: req.session.school_id, gender: 'female'}).countDocuments()
            total_users = await Users.find({isDeleted: false, school_id: req.session.school_id}).countDocuments()
            var wd_null = []
            const well_details = await WellnessDetail.find({isDeleted: false, school_id: req.session.school_id}).sort({created_at: -1})
            for (let i = 0; i < well_details.length; i++) {
                const wd = well_details[i];
                if (wd.bmi_category == '') {
                    const user = await Users.findOne({_id: wd.user_id})
                    var age = await countOld(user.date_of_birth)
                    wd_null.push({...user._doc, age: age})
                }
            }

            var recent_histories = []
            const histories = await History.find({isDeleted: false, school_id: req.session.school_id, created_at: { $gte: startOfDay, $lt: endOfDay }}).sort({created_at: -1})
            for (let i = 0; i < histories.length; i++) {
                const h = histories[i];
                const date = moment(h.created_at).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
                recent_histories.push({name: h.user_id.name, created_at: date, bmi_category: await getCategoryBMI(h.weight, h.height)})
            }

        }
        // console.log({data, d, wd_null, total_users, total_devices, total_stores, schools_unpaid, total_kurus, total_normal, total_gemuk, total_obesitas, cat_bp, age_cat, con_normal_bp, con_normal_temp, cat_os, old, broca, total_male, total_female, recent_histories})
        res.render('dashboard/index', {data, d, wd_null, total_cashier, total_owner, total_stores, schools_unpaid, total_kurus, total_normal, total_gemuk, total_obesitas, cat_bp, age_cat, con_normal_bp, con_normal_temp, cat_os, year: dyear, revenue_yearly, revenue_monthly, percentage_yearly_revenue, percentage_monthly_revenue, old, broca, total_male, total_female, recent_histories});
    },

    history: async (req, res) => {
        const datas = await History.find({isDeleted: false, user_id: req.session.user_id}).sort({created_at: -1})

        res.render('history/index', { datas });
    },

    users: async (req, res) => {
        console.log({user: req.session})
        const datas = []
        const users = await Users.find({isDeleted: false, role: 'user', school_id: req.session.school_id}).sort({name: 1})
        const majorities = await Majority.find({isDeleted: false, school_id: req.session.school_id}).sort({name: 1})
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            var old = await countOld(user.date_of_birth)
            const majority = (user.majority_id == null) ? '-' : `${user.majority_id.class} - ${user.majority_id.name}`
            const user_detail = await WellnessDetail.findOne({user_id: user._id})
            datas.push({ ...user._doc, majority: majority, bmi_score: user_detail.bmi_score, bmi_category: user_detail.bmi_category, height: user_detail.height, weight: user_detail.weight, blood_pressure: user_detail.blood_pressure, temperature: user_detail.temperature, oxygen_saturation: user_detail.oxygen_saturation, old: old})
        }
        res.render('users/index', {datas, majorities});
    },

    userHistory: async (req, res) => {
        const user = await Users.findOne({ _id: req.query._id })
        const datas = await History.find({isDeleted: false, user_id: req.query._id}).sort({created_at: -1})
        const level = user.level

        res.render('users/detail', { name: user.name, level: level.toLowerCase(), datas });
    },


    owners: async (req, res) => {
        const datas = await Users.find({isDeleted: false, role: 'owner'}).sort({created_at: -1})
        const stores = await Stores.find({isDeleted: false}).sort({created_at: -1})
        // console.log({school: stores[0], datas: datas[0]})
        res.render('owners/index', {datas, stores});
    },

    ownerUpdate: async (req, res, next) => {
        try {
            await Users.findOneAndUpdate({ _id: req.params._id }, { ...req.body, updated_at: moment() })
            res.redirect('/owners');
        } catch (error) {
            console.log('error ', error);
        }
    },

    ownerDelete: async (req, res, next) => {
        try {
            await Users.findOneAndUpdate({ _id: req.params._id }, { isDeleted: true, updated_at: moment() })
            res.redirect('/owners');
        } catch (error) {
            console.log('error ', error);
        }
    },

    stores: async (req, res) => {
        const datas = await Stores.find({isDeleted: false}).sort({ created_at: -1 })
        
        res.render('stores/index', {datas});
    },

    storeUpdate: async (req, res, next) => {
        try {
            await Stores.findOneAndUpdate({ _id: req.params._id }, { ...req.body, updated_at: moment() })
            res.redirect('/stores');
        } catch (error) {
            console.log('error ', error);
        }
    },

    storeDelete: async (req, res, next) => {
        try {
            await Stores.findOneAndUpdate({ _id: req.params._id }, { isDeleted: true, updated_at: moment() })
            res.redirect('/stores');
        } catch (error) {
            console.log('error ', error);
        }
    },

    payment: async (req, res) => {
        const datas = await Payments.find({isDeleted: false}).sort({ created_at: -1 })
        const schools = await Schools.find({isDeleted: false}).sort({created_at: -1})
        
        res.render('payment/index', {datas, schools});
    },

    invoice: async (req, res) => {
        const data = await Payments.findOne({isDeleted: false, _id: req.query._id}).sort({ created_at: -1 })

        res.render('payment/invoice', {data});
    },

    profile: async (req, res) => {
        const data = await Users.findOne({isDeleted: false, _id: req.session.user_id}).sort({ created_at: -1 })

        res.render('auth/profile', {data});
    },

    recommendation: async (req, res) => {
        // const str = "## Workout Planner untuk Tinggi Badan 173cm & Berat Badan 79kg\n\n**Tujuan:** Meningkatkan kekuatan, ketahanan, dan keseimbangan. Mengurangi lemak tubuh dan membentuk otot.\n\n**Catatan:**\n\n* Konsultasikan dengan dokter atau pelatih profesional sebelum memulai program latihan baru.\n* Pastikan untuk melakukan pemanasan sebelum setiap latihan dan pendinginan setelahnya.\n* Makan makanan sehat dan minum banyak air selama program latihan.\n* Berikan waktu istirahat yang cukup antara setiap sesi latihan.\n\n**Frekuensi:** 4-5 hari dalam seminggu.\n\n**Durasi:** 45-60 menit per sesi latihan.\n\n**Latihan:**\n\n**Senin:** Kekuatan\n\n* **Squats:** 3 set x 10-12 repetisi\n* **Push-ups:** 3 set x maksimal repetisi\n* **Pull-ups:** 3 set x maksimal repetisi (jika tidak bisa, gunakan bar yang dibantu)\n* **Deadlifts:** 3 set x 8-10 repetisi\n* **Barbell bench press:** 3 set x 8-10 repetisi\n\n**Selasa:** Kardio & Core\n\n* **Interval running:** 20 menit dengan 1 menit lari cepat, 1 menit joging.\n* **Plank:** 3 set x 30-60 detik\n* **Bicycle crunches:** 3 set x 15-20 repetisi\n* **Russian twists:** 3 set x 15-20 repetisi\n* **Leg raises:** 3 set x 15-20 repetisi\n\n**Rabu:** Istirahat\n\n**Kamis:** Kekuatan\n\n* **Overhead press:** 3 set x 10-12 repetisi\n* **Dumbbell rows:** 3 set x 10-12 repetisi\n* **Lunges:** 3 set x 10-12 repetisi per kaki\n* **Barbell back squats:** 3 set x 8-10 repetisi\n* **Dumbbell shoulder press:** 3 set x 8-10 repetisi\n\n**Jumat:** Kardio & Fleksibilitas\n\n* **Cycling:** 30 menit dengan kecepatan sedang.\n* **Yoga:** 30 menit (fokus pada peregangan)\n* **Stretching:** 15 menit\n\n**Sabtu:** Istirahat\n\n**Minggu:** Aktif\n\n* **Hiking:** 1-2 jam\n* **Bermain olahraga:** 1-2 jam (misalnya, basket, tenis)\n* **Berenang:** 30-60 menit\n\n**Catatan:**\n\n* Anda dapat memodifikasi program latihan ini berdasarkan level kebugaran dan preferensi Anda.\n* Pastikan untuk mendengarkan tubuh Anda dan istirahat jika perlu.\n* Anda dapat menambah atau mengurangi beban sesuai kebutuhan.\n* Penting untuk makan dengan benar dan minum banyak air selama program latihan.\n\n**Contoh Makanan Sehat:**\n\n* Sayuran, buah-buahan, dan biji-bijian utuh\n* Protein tanpa lemak, seperti ikan, ayam, dan tahu\n* Lemak sehat, seperti alpukat dan kacang-kacangan\n\n**Tips:**\n\n* Mulailah dengan lambat dan tingkatkan secara bertahap.\n* Jangan ragu untuk meminta bantuan dari pelatih profesional.\n* Tetap konsisten dengan program latihan dan pola makan Anda.\n* Penting untuk bersenang-senang dan menikmati prosesnya.\n\n**Semoga program latihan ini membantu Anda mencapai tujuan kebugaran Anda!**\n"
        // const str= `## Workout Planner untuk Tinggi 173cm & Berat 79kg\n\n**Catatan:**\n\n* **Pemula:** 3 set, 10-12 repetisi\n* **Intermediet:** 3 set, 12-15 repetisi\n* **Lanjutan:** 4 set, 15-20 repetisi\n\n* **Istirahat:** 60 detik antar set\n* **Frekuensi:** 3-4 kali seminggu\n* **Durasi:** 45-60 menit\n\n**Hari 1: Upper Body**\n\n| Latihan | Set | Repetisi |\n|---|---|---|\n| Push-ups | 3 | 10-12 |\n| Dumbbell Bench Press | 3 | 12-15 |\n| Dumbbell Rows | 3 | 12-15 |\n| Overhead Press | 3 | 10-12 |\n| Bicep Curls | 3 | 12-15 |\n| Tricep Extensions | 3 | 12-15 |\n\n**Hari 2: Lower Body & Core**\n\n| Latihan | Set | Repetisi |\n|---|---|---|\n| Squats | 3 | 10-12 |\n| Lunges | 3 | 10-12 per kaki |\n| Deadlifts | 3 | 8-10 |\n| Plank | 3 | 30 detik |\n| Crunches | 3 | 15-20 |\n\n**Hari 3: Cardio & Rest**\n\n* 30-45 menit Cardio (lari, bersepeda, berenang, dll)\n* Istirahat\n\n**Hari 4: Repeat Hari 1**\n\n**Hari 5: Repeat Hari 2**\n\n**Hari 6: Rest**\n\n**Hari 7: Repeat Hari 1**\n\n**Tips:**\n\n* Gunakan berat yang menantang tetapi memungkinkan Anda untuk menjaga teknik yang benar.\n* Dengarkan tubuh Anda dan jangan takut untuk beristirahat jika diperlukan.\n* Variasikan latihan Anda untuk mencegah kebosanan dan menjaga agar otot Anda terus bekerja.\n* Konsultasikan dengan profesional kebugaran untuk rencana latihan yang disesuaikan dengan kebutuhan Anda.\n\n**Penting:** \n\n* Konsultasikan dengan dokter Anda sebelum memulai program latihan baru.\n* Pastikan Anda makan makanan yang sehat dan seimbang untuk mendukung latihan Anda.\n* Minum cukup air sebelum, selama, dan setelah latihan. \n* Selalu berhati-hati saat berolahraga. \n`
        // const x = str.replace(/(?:\r\n|\r|\n)/g, "<br/>");
        // // console.log({data})
        // const data = x.replace(/[*]/g,'_');
        const datas = []
        const activities = [{"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Berlari dengan kecepatan sedang", "latihan": "Lari", "repetisi": "20 menit", "set": "1"}, {"keterangan": "Lakukan pendinginan setelah berlari", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Senin"}, {"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Lakukan push up dengan benar", "latihan": "Push Up", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan squat dengan benar", "latihan": "Squat", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan pull up dengan benar", "latihan": "Pull Up", "repetisi": "5", "set": "3"}, {"keterangan": "Lakukan plank dengan benar", "latihan": "Plank", "repetisi": "30 detik", "set": "3"}, {"keterangan": "Lakukan crunches dengan benar", "latihan": "Crunches", "repetisi": "15", "set": "3"}, {"keterangan": "Lakukan pendinginan setelah selesai workout", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Selasa"}, {"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Bersepeda dengan kecepatan sedang", "latihan": "Bersepeda", "repetisi": "30 menit", "set": "1"}, {"keterangan": "Lakukan pendinginan setelah selesai bersepeda", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Rabu"}, {"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Lakukan jumping jack dengan benar", "latihan": "Jumping Jack", "repetisi": "20", "set": "3"}, {"keterangan": "Lakukan burpees dengan benar", "latihan": "Burpees", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan mountain climbers dengan benar", "latihan": "Mountain Climbers", "repetisi": "15", "set": "3"}, {"keterangan": "Lakukan jumping lunges dengan benar", "latihan": "Jumping Lunges", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan plank jacks dengan benar", "latihan": "Plank Jacks", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan pendinginan setelah selesai workout", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Kamis"}, {"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Bergabung dengan kelas yoga", "latihan": "Yoga", "repetisi": "60 menit", "set": "1"}, {"keterangan": "Lakukan pendinginan setelah selesai yoga", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Jumat"}, {"aktivitas": [{"keterangan": "Hari ini adalah hari istirahat", "latihan": "Istirahat", "repetisi": "1 hari", "set": "1"}], "hari": "Sabtu"}, {"aktivitas": [{"keterangan": "Lakukan kegiatan ringan seperti berjalan-jalan", "latihan": "Aktivitas Ringan", "repetisi": "30 menit", "set": "1"}], "hari": "Minggu"}] 
        const today = new Date();
        const dayIndex = today.getDay();
        const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const currentDay = dayNames[dayIndex];
        // console.log({currentDay})
        for (let i = 0; i < activities.length; i++) {
            const act = activities[i];
            // console.log({act})
            if (act.hari == currentDay) {
                datas.push(act)
            }
        }
        
        res.render('recommended/index', { datas })
    },

    meals: async (req, res) => {
        // const datas = await Majority.find({isDeleted: false, school_id: req.session.school_id}).sort({ created_at: -1 })
        
        res.render('recommended/meals', {});
    },

    majority: async (req, res) => {
        const datas = await Majority.find({isDeleted: false, school_id: req.session.school_id}).sort({ created_at: -1 })
        
        res.render('majority/index', {datas});
    },

    majorityUpdate: async (req, res, next) => {
        try {
            await Majority.findOneAndUpdate({ _id: req.params._id }, { ...req.body, updated_at: moment() })
            res.redirect('/majority');
        } catch (error) {
            console.log('error ', error);
        }
    },

    statisticCharts: async (req, res) => {
        const arr_revenue = []
        var total = 0

        const d = new Date();
        let dyear = d.getFullYear();

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

            for (let k = 0; k < payments.length; k++) {
                const e = payments[k];
                total += e.total_price

                arr_revenue.push(total)
            }
        }

        // console.log({ arr_kesejahteraan, arr_infra, arr_fasum })
        res.json({ success: 200, data: { arr_revenue }})
        
    }

    
    
}

module.exports = IndexController;