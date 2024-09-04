import { authController } from "../classes/classController"
import m from "../classes/authModel"
  
let model = new m()
let rtr = authController(model)

module.exports = rtr