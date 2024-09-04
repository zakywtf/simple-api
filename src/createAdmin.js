

import bcrypt from "bcryptjs";
import mongoose from 'mongoose';
import model from './schemas/users'

let dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const createAdmin = async () => {
    let passwordHash = await bcrypt.hash('12345678' + process.env.SALT, 10);

    let admin = new model({
        password: passwordHash,
        email: 'developer@beehivedrones.com',
        name: 'Developer Beehive',
        role: 'developer',
        phone: '08324378979',
        employee_id: '20200101001'
    });

    await admin.save()
}

createAdmin()

model.find({},(err,resp)=>{
    console.log(resp, err, 'findone');
})


 