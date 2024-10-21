import Models from "../classes/classModel";
import sch from "../schemas/schools";

class schoolsModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=schoolsModel