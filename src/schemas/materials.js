const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    name: {
        type: String,
    },
    store_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'name address status latitude longitude'}, 
        ref:'stores',
        default: null
    },
    unit: {
        type:String, 
        default:null
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

module.exports = mongoose.model("materials", sch);