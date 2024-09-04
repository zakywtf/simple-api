import Models from "../classes/classModel";
import sch from "../schemas/users";

class usersModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=usersModel