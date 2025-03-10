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
import Materials from "../schemas/materials";
import Stocks from "../schemas/stocks";
import Menus from "../schemas/menus";
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

    cashiers: async (req, res) => {
        const datas = await Users.find({isDeleted: false, role: 'cashier', store_id: req.session.store_id}).sort({created_at: -1})
        const stores = await Stores.find({isDeleted: false}).sort({created_at: -1})
        // console.log({school: stores[0], datas: datas[0]})
        res.render('cashiers/index', {datas, stores});
    },

    cashierUpdate: async (req, res, next) => {
        try {
            await Users.findOneAndUpdate({ _id: req.params._id }, { ...req.body, updated_at: moment() })
            res.redirect('/cashiers');
        } catch (error) {
            console.log('error ', error);
        }
    },

    cashierDelete: async (req, res, next) => {
        try {
            await Users.findOneAndUpdate({ _id: req.params._id }, { isDeleted: true, updated_at: moment() })
            res.redirect('/cashiers');
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

    materials: async (req, res) => {
        const datas = await Materials.find({isDeleted: false, store_id: req.session.store_id}).sort({ created_at: -1 })
        
        res.render('materials/index', {datas});
    },

    materialUpdate: async (req, res, next) => {
        try {
            await Materials.findOneAndUpdate({ _id: req.params._id }, { ...req.body, updated_at: moment() })
            res.redirect('/materials');
        } catch (error) {
            console.log('error ', error);
        }
    },

    materialDelete: async (req, res, next) => {
        try {
            await Materials.findOneAndUpdate({ _id: req.params._id }, { isDeleted: true, updated_at: moment() })
            res.redirect('/materials');
        } catch (error) {
            console.log('error ', error);
        }
    },

    stocks: async (req, res) => {
        const datas = await Stocks.find({isDeleted: false, store_id: req.session.store_id}).sort({ created_at: -1 })
        const materials = await Materials.find({isDeleted: false, store_id: req.session.store_id}).sort({ created_at: -1 })
        
        res.render('stocks/index', {datas, materials});
    },

    menus: async (req, res) => {
        const datas = await Menus.find({isDeleted: false, store_id: req.session.store_id}).sort({ created_at: -1 })
        const materials = await Materials.find({isDeleted: false, store_id: req.session.store_id}).sort({ created_at: -1 })
        
        res.render('menus/index', {datas, materials});
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
    
    
}

module.exports = IndexController;