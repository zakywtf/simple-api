
// let dotenv = require('dotenv')

const bcrypt = require("bcryptjs");
const model = require('./schemas/users')
const details = require('./schemas/wellness_details')
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wellness_monitoring';
const salt = 'Be5TgHbUSBDiQ04K0dE5vPwrtJKd6ilYnjGEmQ'
mongoose.connect(mongoURI, { useNewUrlParser: true });

const datas = [
    '67a21c895411d5eee698d078',
    '67a21c8a5411d5eee698d1c8',
    '67a21c895411d5eee698d040',
    '67a21c8a5411d5eee698d0b8',
    '67a21c8a5411d5eee698d210',
    '67a21c8a5411d5eee698d2cc',
    '67a21c8a5411d5eee698d1d8',
    '67a21c8a5411d5eee698d1a0',
    '67a21c895411d5eee698d034',
    '67a21c895411d5eee698d07c',
    '67a21c8a5411d5eee698d0a8',
    '67a21c8a5411d5eee698d0d4',
    '67a21c895411d5eee698d080',
    '67a21c8a5411d5eee698d1c4',
    '67a21c8a5411d5eee698d224',
    '67a21c895411d5eee698d094',
    '67a21c8a5411d5eee698d154',
    '67a21c8a5411d5eee698d318',
    '67a21c8a5411d5eee698d1e4',
    '67a21c8a5411d5eee698d104',
    '67a21c895411d5eee698d070',
    '67a21c8a5411d5eee698d114',
    '67a21c895411d5eee698d06c',
    '67a21c8a5411d5eee698d1cc',
    '67a21c8a5411d5eee698d1e8',
    '67a21c8a5411d5eee698d0d8',
    '67a21c8a5411d5eee698d128',
    '67a21c895411d5eee698d008',
    '67a21c8a5411d5eee698d130',
    '67a21c8a5411d5eee698d284',
    '67a21c895411d5eee698d088',
    '67a21c8a5411d5eee698d2e0',
    '67a21c8b5411d5eee698d37c',
    '67a21c8a5411d5eee698d304',
    '67a21c895411d5eee698cf98',
    '67a21c8a5411d5eee698d350',
    '67a21c8a5411d5eee698d2e8',
    '67a21c8a5411d5eee698d19c',
    '67a21c8a5411d5eee698d134',
    '67a21c895411d5eee698cf10',
    '67a21c8a5411d5eee698d29c',
    '67a21c8a5411d5eee698d0f8',
    '67a21c8a5411d5eee698d298',
    '67a21c8a5411d5eee698d294',
    '67a21c895411d5eee698d0a0',
    '67a21c8a5411d5eee698d138',
    '67a21c895411d5eee698ceb8',
    '67a21c895411d5eee698cf84',
    '67a21c895411d5eee698cfb8',
    '67a21c8a5411d5eee698d358',
    '67a21c8a5411d5eee698d1d4',
    '67a21c8a5411d5eee698d190',
    '67a21c8a5411d5eee698d1b8',
    '67a21c8a5411d5eee698d10c',
    '67a21c8a5411d5eee698d288',
    '67a21c8a5411d5eee698d2dc',
    '67a21c8a5411d5eee698d18c',
    '67a21c8a5411d5eee698d1bc',
    '67a21c8a5411d5eee698d240',
    '67a21c8a5411d5eee698d150',
    '67a21c8a5411d5eee698d278',
    '67a21c895411d5eee698cec0',
    '67a21c8a5411d5eee698d334',
    '67a21c895411d5eee698d00c',
    '67a21c8a5411d5eee698d1ec',
    '67a21c8a5411d5eee698d320',
    '67a21c8a5411d5eee698d274',
    '67a21c8a5411d5eee698d158',
    '67a21c8a5411d5eee698d2e4',
    '67a21c8a5411d5eee698d1ac',
    '67a21c8a5411d5eee698d2d8',
    '67a21c8a5411d5eee698d290',
    '67a21c8a5411d5eee698d1f0',
    '67a21c8a5411d5eee698d33c',
    '67a21c8a5411d5eee698d280',
    '67a21c8a5411d5eee698d0ac',
    '67a21c8a5411d5eee698d32c',
    '67a21c895411d5eee698d014',
    '67a21c8a5411d5eee698d100',
    '67a21c8a5411d5eee698d0f4'
]
const deleteUsers = async () => {
    for (let i = 0; i < datas.length; i++) {
        const d = datas[i];
        console.log({d})
        const data = await model.findOne({ _id: d })
        data.isDeleted = true
        await data.save()

        const detail = await details.findOne({ user_id: d })
        detail.isDeleted = true
        await detail.save()
    }
}

deleteUsers()

console.log('okeeee')


 