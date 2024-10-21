import Models from "../classes/classModel";
import sch from "../schemas/devices";

class devicesModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=devicesModel