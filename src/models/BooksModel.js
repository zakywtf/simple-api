import Models from "../classes/classModel";
import sch from "../schemas/books";

class booksModel extends Models{
    constructor(){
        super(sch)
    }

}

module.exports=booksModel