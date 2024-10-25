import { controller } from "../classes/classController"
import m from "../models/HistoryModel"
import handleRequest from "../helpers/handleRequest"

let model = new m()
let rtr = controller(model)

rtr.post('/create', async (req, res, next) => {
    console.log({user: req.user})
    handleRequest(req, res, async(body)=>{
        model.setUdata(req.user)

        return await model.create(req.body);
    });
})

module.exports = rtr