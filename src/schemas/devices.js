const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    device_id: {
        type: String,
    },
    name: {
        type: String,
    },
    partner_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'name address industry status latitude longitude'}, 
        ref:'partners',
        default: null
    },
    condition : {
        type:String, 
        enum:['good', 'broken', 'maintenance'], 
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