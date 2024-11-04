const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    height: {
        type: String,
        default: '0'
    },
    weight: {
        type: String,
        default: '0'
    },
    temperature: {
        type: String,
        default: '0'
    },
    blood_pressure: {
        type: String,
        default: '0'
    },
    blood_sugar: {
        type: String,
        default: '0'
    },
    hemoglobin: {
        type: String,
        default: '0'
    },
    kolesterol: {
        type: String,
        default: '0'
    },
    oxygen_saturation: {
        type: String,
        default: '0'
    },
    school_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'npsn name address category status school_status'}, 
        ref:'schools',
        default: null
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'nisn name gender status'}, 
        ref:'users',
        default: null
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

module.exports = mongoose.model("history", sch);