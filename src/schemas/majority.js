const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    class: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    capacity: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        default: null
    },
    school_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'npsn name address category status school_status'}, 
        ref:'schools',
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

module.exports = mongoose.model("majority", sch);