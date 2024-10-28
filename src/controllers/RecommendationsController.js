import { controller } from "../classes/classController"
import m from "../models/RecommendationsModel"
import handleRequest from "../helpers/handleRequest"

let model = new m()
let rtr = controller(model)

module.exports = rtr