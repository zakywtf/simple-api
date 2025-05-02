const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');
const partner_id = require('./authors');

let sch = new Schema({
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        default: null,
        unique: true
    },
    role : {
        type:String, 
        enum:['admin'], 
        default:'admin'
    },
    status:{
        type:String, 
        enum:['registered', 'active', 'inactive', 'unpaid', 'suspend'], 
        default:'active'
    },
    user_agent:{
        browser: {
            type: String,
            default: null
        },
        version: {
            type: String,
            default: null
        },
        os: {
            type: String,
            default: null
        },
        platform: {
            type: String,
            default: null
        },
        source: {
            type: String,
            default: null
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deleted_at: {
        type: Date
    }
});

sch.plugin(timestamp);
sch.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model("users", sch);