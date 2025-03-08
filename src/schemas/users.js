const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');
const store_id = require('./stores');

let sch = new Schema({
    username: {
        type: String,
        unique: true,
    },
    password: {
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
    address: {
        type: String,
        default: null
    },
    profile_picture: {
        type: String,
        default: null
    },
    role : {
        type:String, 
        enum:['cashier', 'developer', 'owner'], 
        default:'cashier'
    },
    gender : {
        type:String, 
        enum:['male', 'female'], 
        default:'female'
    },
    status:{
        type:String, 
        enum:['registered', 'active', 'inactive', 'unpaid', 'suspend'], 
        default:'active'
    },
    store_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'name address status latitude longitude'}, 
        ref:'stores',
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