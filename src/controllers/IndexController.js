const fetch = require('node-fetch');
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import OpenAI from 'openai';
import apiResponse from "../helpers/apiResponse";
import mailer from "../helpers/nodeMailer";
import Users from "../schemas/users";
import { generate } from "../helpers/randGen";
import { detailEmail } from "../helpers/sendEmail"


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

    testPlanner: async (req, res) => {
        const url = 'https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/nutritionAdvice?noqueue=1';
        const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'd582f685e8msh7ecda2e52eb8d08p10038djsndf5589ddcc01',
            'x-rapidapi-host': 'ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: {
            goal: 'Lose weight',
            dietary_restrictions: ['Vegetarian'],
            current_weight: 80,
            target_weight: 70,
            daily_activity_level: 'Moderate',
            lang: 'en'
        }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    },

    testOpenAi: async (req, res) => {
        const client = new OpenAI({
            apiKey: process.env.OPENAI_KEY,
            organization:'org-YrUIkWNv0KnRIWi8k4yDsXjt',
            project:'proj_DiUhYrQdOLtW6bhhMrr5WAyK',
        });

        const response = await client.chat.completions.create({
            messages: [{ role: 'user', content: 'Say this is a test' }],
            model: 'gpt-4o-mini'
        })

        // access the underlying Response object
        // console.log(response.headers.get('x-ratelimit-limit-tokens'));
        console.log(response._request_id);
        return apiResponse.successResponseWithData(res, "great!", response)

    },  

    testGemini: async (req, res) => {
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
                            // "cost": {
                            //     "description": "Cost of requirement material for running the recipe. Unit is dollar.",
                            //     "type": "number",
                            // }
                        },
                        required: ["latihan", "set", "repetisi", "keterangan"]
                    },
              },
            //   required: ["hari", "aktivitas"],
            },
          }
        }
          
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-pro",
            generationConfig: {
                responseMimeType: "application/json",
                responseSchema: schema,
            },
        });

        const prompt = "workout planner untuk tinggi badan 173cm dan berat badan 79kg";
        // const prompt = "nutrisi advice untuk badan 173cm, berat badan 79kg, tekanan darah 120/80 mmHg";

        const result = await model.generateContent(prompt);
        console.log({result})
        // return apiResponse.successResponseWithData(res, "great!", result.response.text()

        return apiResponse.successResponseWithData(res, "great!", result)
    },

    loginPage: async (req, res) => {
        res.render('auth/login');
    },

    registerPage: async (req, res) => {
        res.render('auth/register');
    },

    dashboard: async (req, res) => {
        res.render('dashboard/admin-dashboard');
    },

    history: async (req, res) => {
        res.render('history/index');
    },

    users: async (req, res) => {
        res.render('users/index');
    },

    devices: async (req, res) => {
        res.render('devices/index');
    },

    schools: async (req, res) => {
        res.render('schools/index');
    },

    recommendation: async (req, res) => {
        // const str = "## Workout Planner untuk Tinggi Badan 173cm & Berat Badan 79kg\n\n**Tujuan:** Meningkatkan kekuatan, ketahanan, dan keseimbangan. Mengurangi lemak tubuh dan membentuk otot.\n\n**Catatan:**\n\n* Konsultasikan dengan dokter atau pelatih profesional sebelum memulai program latihan baru.\n* Pastikan untuk melakukan pemanasan sebelum setiap latihan dan pendinginan setelahnya.\n* Makan makanan sehat dan minum banyak air selama program latihan.\n* Berikan waktu istirahat yang cukup antara setiap sesi latihan.\n\n**Frekuensi:** 4-5 hari dalam seminggu.\n\n**Durasi:** 45-60 menit per sesi latihan.\n\n**Latihan:**\n\n**Senin:** Kekuatan\n\n* **Squats:** 3 set x 10-12 repetisi\n* **Push-ups:** 3 set x maksimal repetisi\n* **Pull-ups:** 3 set x maksimal repetisi (jika tidak bisa, gunakan bar yang dibantu)\n* **Deadlifts:** 3 set x 8-10 repetisi\n* **Barbell bench press:** 3 set x 8-10 repetisi\n\n**Selasa:** Kardio & Core\n\n* **Interval running:** 20 menit dengan 1 menit lari cepat, 1 menit joging.\n* **Plank:** 3 set x 30-60 detik\n* **Bicycle crunches:** 3 set x 15-20 repetisi\n* **Russian twists:** 3 set x 15-20 repetisi\n* **Leg raises:** 3 set x 15-20 repetisi\n\n**Rabu:** Istirahat\n\n**Kamis:** Kekuatan\n\n* **Overhead press:** 3 set x 10-12 repetisi\n* **Dumbbell rows:** 3 set x 10-12 repetisi\n* **Lunges:** 3 set x 10-12 repetisi per kaki\n* **Barbell back squats:** 3 set x 8-10 repetisi\n* **Dumbbell shoulder press:** 3 set x 8-10 repetisi\n\n**Jumat:** Kardio & Fleksibilitas\n\n* **Cycling:** 30 menit dengan kecepatan sedang.\n* **Yoga:** 30 menit (fokus pada peregangan)\n* **Stretching:** 15 menit\n\n**Sabtu:** Istirahat\n\n**Minggu:** Aktif\n\n* **Hiking:** 1-2 jam\n* **Bermain olahraga:** 1-2 jam (misalnya, basket, tenis)\n* **Berenang:** 30-60 menit\n\n**Catatan:**\n\n* Anda dapat memodifikasi program latihan ini berdasarkan level kebugaran dan preferensi Anda.\n* Pastikan untuk mendengarkan tubuh Anda dan istirahat jika perlu.\n* Anda dapat menambah atau mengurangi beban sesuai kebutuhan.\n* Penting untuk makan dengan benar dan minum banyak air selama program latihan.\n\n**Contoh Makanan Sehat:**\n\n* Sayuran, buah-buahan, dan biji-bijian utuh\n* Protein tanpa lemak, seperti ikan, ayam, dan tahu\n* Lemak sehat, seperti alpukat dan kacang-kacangan\n\n**Tips:**\n\n* Mulailah dengan lambat dan tingkatkan secara bertahap.\n* Jangan ragu untuk meminta bantuan dari pelatih profesional.\n* Tetap konsisten dengan program latihan dan pola makan Anda.\n* Penting untuk bersenang-senang dan menikmati prosesnya.\n\n**Semoga program latihan ini membantu Anda mencapai tujuan kebugaran Anda!**\n"
        // const str= `## Workout Planner untuk Tinggi 173cm & Berat 79kg\n\n**Catatan:**\n\n* **Pemula:** 3 set, 10-12 repetisi\n* **Intermediet:** 3 set, 12-15 repetisi\n* **Lanjutan:** 4 set, 15-20 repetisi\n\n* **Istirahat:** 60 detik antar set\n* **Frekuensi:** 3-4 kali seminggu\n* **Durasi:** 45-60 menit\n\n**Hari 1: Upper Body**\n\n| Latihan | Set | Repetisi |\n|---|---|---|\n| Push-ups | 3 | 10-12 |\n| Dumbbell Bench Press | 3 | 12-15 |\n| Dumbbell Rows | 3 | 12-15 |\n| Overhead Press | 3 | 10-12 |\n| Bicep Curls | 3 | 12-15 |\n| Tricep Extensions | 3 | 12-15 |\n\n**Hari 2: Lower Body & Core**\n\n| Latihan | Set | Repetisi |\n|---|---|---|\n| Squats | 3 | 10-12 |\n| Lunges | 3 | 10-12 per kaki |\n| Deadlifts | 3 | 8-10 |\n| Plank | 3 | 30 detik |\n| Crunches | 3 | 15-20 |\n\n**Hari 3: Cardio & Rest**\n\n* 30-45 menit Cardio (lari, bersepeda, berenang, dll)\n* Istirahat\n\n**Hari 4: Repeat Hari 1**\n\n**Hari 5: Repeat Hari 2**\n\n**Hari 6: Rest**\n\n**Hari 7: Repeat Hari 1**\n\n**Tips:**\n\n* Gunakan berat yang menantang tetapi memungkinkan Anda untuk menjaga teknik yang benar.\n* Dengarkan tubuh Anda dan jangan takut untuk beristirahat jika diperlukan.\n* Variasikan latihan Anda untuk mencegah kebosanan dan menjaga agar otot Anda terus bekerja.\n* Konsultasikan dengan profesional kebugaran untuk rencana latihan yang disesuaikan dengan kebutuhan Anda.\n\n**Penting:** \n\n* Konsultasikan dengan dokter Anda sebelum memulai program latihan baru.\n* Pastikan Anda makan makanan yang sehat dan seimbang untuk mendukung latihan Anda.\n* Minum cukup air sebelum, selama, dan setelah latihan. \n* Selalu berhati-hati saat berolahraga. \n`
        // const x = str.replace(/(?:\r\n|\r|\n)/g, "<br/>");
        // // console.log({data})
        // const data = x.replace(/[*]/g,'_');
        const datas = [{"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Berlari dengan kecepatan sedang", "latihan": "Lari", "repetisi": "20 menit", "set": "1"}, {"keterangan": "Lakukan pendinginan setelah berlari", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Senin"}, {"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Lakukan push up dengan benar", "latihan": "Push Up", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan squat dengan benar", "latihan": "Squat", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan pull up dengan benar", "latihan": "Pull Up", "repetisi": "5", "set": "3"}, {"keterangan": "Lakukan plank dengan benar", "latihan": "Plank", "repetisi": "30 detik", "set": "3"}, {"keterangan": "Lakukan crunches dengan benar", "latihan": "Crunches", "repetisi": "15", "set": "3"}, {"keterangan": "Lakukan pendinginan setelah selesai workout", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Selasa"}, {"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Bersepeda dengan kecepatan sedang", "latihan": "Bersepeda", "repetisi": "30 menit", "set": "1"}, {"keterangan": "Lakukan pendinginan setelah selesai bersepeda", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Rabu"}, {"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Lakukan jumping jack dengan benar", "latihan": "Jumping Jack", "repetisi": "20", "set": "3"}, {"keterangan": "Lakukan burpees dengan benar", "latihan": "Burpees", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan mountain climbers dengan benar", "latihan": "Mountain Climbers", "repetisi": "15", "set": "3"}, {"keterangan": "Lakukan jumping lunges dengan benar", "latihan": "Jumping Lunges", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan plank jacks dengan benar", "latihan": "Plank Jacks", "repetisi": "10", "set": "3"}, {"keterangan": "Lakukan pendinginan setelah selesai workout", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Kamis"}, {"aktivitas": [{"keterangan": "Lakukan pemanasan sebelum mulai", "latihan": "Pemanasan", "repetisi": "1 menit", "set": "1"}, {"keterangan": "Bergabung dengan kelas yoga", "latihan": "Yoga", "repetisi": "60 menit", "set": "1"}, {"keterangan": "Lakukan pendinginan setelah selesai yoga", "latihan": "Pendinginan", "repetisi": "1 menit", "set": "1"}], "hari": "Jumat"}, {"aktivitas": [{"keterangan": "Hari ini adalah hari istirahat", "latihan": "Istirahat", "repetisi": "1 hari", "set": "1"}], "hari": "Sabtu"}, {"aktivitas": [{"keterangan": "Lakukan kegiatan ringan seperti berjalan-jalan", "latihan": "Aktivitas Ringan", "repetisi": "30 menit", "set": "1"}], "hari": "Minggu"}] 
        res.render('recommended/index', { datas })
    }

    
    
}

module.exports = IndexController;