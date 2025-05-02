import Models from "../classes/classModel";
import sch from "../schemas/authors";

class authorsModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=authorsModel