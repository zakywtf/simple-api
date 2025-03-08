
// let dotenv = require('dotenv')

const bcrypt = require("bcryptjs");
const model = require('./schemas/users')
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/point_of_sales';
const salt = 'Be5TgHbUSBDiQ04K0dE5vPwrtJKd6ilYnjGEmQ'
mongoose.connect(mongoURI, { useNewUrlParser: true });

const createAdmin = async () => {
    let passwordHash = await bcrypt.hash('dev123!' + salt, 10);

    let admin = new model({
        password: passwordHash,
        name: 'Developer',
        username: 'developer',
        role: 'developer'
    });

    await admin.save()
}

createAdmin()

model.find({},(err,resp)=>{
    console.log(resp, err, 'findone');
})


 