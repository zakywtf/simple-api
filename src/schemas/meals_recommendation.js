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
    blood_pressure: {
        type: String,
        default: null
    },
    meals:[{
        makanan:{
            type: Array
        },
        hari: {
            type: String
        }
    }],
    user_id: {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'nisn name gender status school_id'}, 
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

module.exports = mongoose.model("meals_recommendation", sch);