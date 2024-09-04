const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    nik: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String
    },
    group_name: {
        type: String,
        default: null
    },
    profile_picture: {
        type: String,
        default: null
    },
    role : {
        type:String, 
        enum:['penyuluh', 'admin'], 
        default:'penyuluh'
    },
    status:{
        type:String, 
        enum:['registered', 'active', 'inactive', 'unpaid', 'suspend'], 
        default:'active'
    },
    membership: {
        type:String, 
        enum:['trial', 'basic', 'pro', 'premium', 'enterprise'], 
        default:'basic'
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    last_login: {
        type: Date
    },
    total_login: {
        type: Number,
        default: 0
    },
    province: {
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    },
    regencies: {
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    },
    district: {
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    },
    village: {
        id: {
            type: String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
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
    agree_tnc: {
        type: Boolean,
        default: false
    },
    expired_membership: {
        type: Date
    },
    referal_code: {
        type: String,
        default: null
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