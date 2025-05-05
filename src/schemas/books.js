const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require('./plugins/timestamps');

let sch = new Schema({
    title: {
        type: String,
    },
    genre: {
        type: String,
    },
    author : {
        type: Schema.Types.ObjectId, 
        autopopulate: { select: 'name bio website'}, 
        ref:'authors',
        default: null
    },
    published : {
        type: Date
    },
    status: {
        type: String,
        enum: ['borrow', 'available'],
        default: 'available'
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

module.exports = mongoose.model("books", sch);