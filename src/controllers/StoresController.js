import { controller } from "../classes/classController"
import m from "../models/StoresModel"
import handleRequest from "../helpers/handleRequest"

let model = new m()
let rtr = controller(model)

module.exports = rtr