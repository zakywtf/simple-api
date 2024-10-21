
// let dotenv = require('dotenv')

const bcrypt = require("bcryptjs");
const model = require('./schemas/users')
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wellness_monitoring';
const salt = 'Be5TgHbUSBDiQ04K0dE5vPwrtJKd6ilYnjGEmQ'
mongoose.connect(mongoURI, { useNewUrlParser: true });

const createAdmin = async () => {
    let pinHash = await bcrypt.hash('123456' + salt, 10);

    let admin = new model({
        pin: pinHash,
        name: 'Admin Beehive',
        nisn: '11223344',
        role: 'admin'
    });

    await admin.save()
}

createAdmin()

model.find({},(err,resp)=>{
    console.log(resp, err, 'findone');
})


 