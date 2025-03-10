const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    material_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'name unit'}, 
        ref:'materials',
        default: null
    },
    store_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'name address status latitude longitude'}, 
        ref:'stores',
        default: null
    },
    amount: {
        type: Number, 
        default:0
    },
    opname: {
        type: Number,
        default: 0
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

module.exports = mongoose.model("stocks", sch);