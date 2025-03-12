import Models from "../classes/classModel";
import sch from "../schemas/users";
import moment from 'moment'
import bcrypt from "bcryptjs";

class usersModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=usersModel