const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    npsn: {
        type: String,
    },
    name: {
        type: String,
    },
    address: {
        type: String,
    },
    latitude: {
        type: String,
        default: null
    },
    longitude: {
        type: String,
        default: null
    },
    status : {
        type:String, 
        enum:['negeri', 'swasta'], 
        default:'negeri'
    },
    category : {
        type:String, 
        enum:['SD', 'MI', 'SMP', 'MTS', 'SMA', 'SMK', 'MA'], 
        default:'SD'
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

module.exports = mongoose.model("schools", sch);