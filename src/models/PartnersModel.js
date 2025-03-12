import Models from "../classes/classModel";
import sch from "../schemas/partners";

class partnersModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=partnersModel