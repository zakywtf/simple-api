import { controller } from "../classes/classController"
import m from "../models/BooksModel"
import handleRequest from "../helpers/handleRequest"

let model = new m()
let rtr = controller(model)

rtr.post('/borrow/:id', async (req, res, next) => {
    console.log({user: req.user})
    handleRequest(req, res, async(body)=>{
        model.setUdata(req.user)
        const resp =  await model.borrow(req.params.id);

        console.log({resp})

        return resp

    });
})

module.exports = rtr