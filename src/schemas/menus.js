const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    name: {
        type: String,
        default: null
    },
    base_price: {
        type: Number,
        default: 0
    },
    selling_price: {
        type: Number,
        default: 0
    },
    picture: {
        type: String,
        default: "default.png"
    },
    recipe: [{
        material_id : {
            type: Schema.Types.ObjectId, 
            autopopulate: { select: 'name unit'}, 
            ref:'materials',
            default: null
        },
        amount: {
            type: Number,
            default: 0
        }
    }],
    store_id : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'name address status latitude longitude'}, 
        ref:'stores',
        default: null
    },
    category : {
        type:String, 
        enum:['food', 'drink', 'toping'], 
        default:'food'
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

module.exports = mongoose.model("menus", sch);