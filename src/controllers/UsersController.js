import { controller } from "../classes/classController"
import m from "../models/UsersModel"
import handleRequest from "../helpers/handleRequest"

let model = new m()
let rtr = controller(model)

rtr.get('/bmi/charts/:month', async (req, res, next) => {
    console.log({user: req.user})
    handleRequest(req, res, async(body)=>{
        model.setUdata(req.user)
        return await model.charts(req.params.month, req.user.school_id);
    });
})

rtr.post('/owners', async (req, res, next) => {
    console.log({user: req.user})
    handleRequest(req, res, async(body)=>{
        model.setUdata(req.user)
        return await model.owners(body);
    });
})

module.exports = rtr