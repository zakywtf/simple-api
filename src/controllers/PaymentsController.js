import { controller } from "../classes/classController"
import m from "../models/PaymentsModel"
import handleRequest from "../helpers/handleRequest"
const fileupload = require("express-fileupload")

let model = new m()
let rtr = controller(model)
rtr.use(fileupload())

rtr.post('/create', async (req, res, next) => {
    console.log({user: req.user})
    handleRequest(req, res, async(body)=>{
        model.setUdata(req.user)
        console.log({body: req.body, file: req.files})
        return await model.create(req.body, req.files);
    });
})

rtr.get('/revenue/charts', async (req, res, next) => {
    console.log({user: req.user})
    handleRequest(req, res, async(body)=>{
        model.setUdata(req.user)
        return await model.charts();
    });
})

module.exports = rtr