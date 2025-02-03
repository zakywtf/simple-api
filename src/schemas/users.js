const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    nisn: {
        type: String,
    },
    pin: {
        type: String,
    },
    name: {
        type: String,
    },
    email: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    profile_picture: {
        type: String,
        default: null
    },
    role : {
        type:String, 
        enum:['user', 'admin', 'teacher'], 
        default:'user'
    },
    gender : {
        type:String, 
        enum:['male', 'female'], 
        default:'male'
    },
    status:{
        type:String, 
        enum:['registered', 'active', 'inactive', 'unpaid', 'suspend'], 
        default:'active'
    },
    school_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'npsn name address category status latitude longitude'}, 
        ref:'schools',
        default: null
    },
    majority_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'class name capacity notes'}, 
        ref:'majority',
        default: null
    },
    origin_address: {
        type: String,
        default: null
    },
    domicile_address: {
        type: String,
        default: null
    },
    position: {
        type: String,
        default: null
    },
    level: {
        type: String,
        default: null
    },
    plant: {
        type: String,
        default: null
    },
    date_of_birth: {
        type: Date,
        default: null
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date,
        default: null
    },
    total_login: {
        type: Number,
        default: 0
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
    isExpired: {
        type: Boolean,
        default: false
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