const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    device_number: {
        type: String,
    },
    name: {
        type: String,
    },
    school_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'npsn name address category status latitude longitude'}, 
        ref:'schools',
        default: null
    },
    condition : {
        type:String, 
        enum:['good', 'damaged'], 
        default:'good'
    },
    notes: {
        type: String,
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

module.exports = mongoose.model("devices", sch);