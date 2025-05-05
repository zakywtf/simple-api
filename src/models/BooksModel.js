import Models from "../classes/classModel";
import sch from "../schemas/books";
import { ValidationError, NotFoundError, ServerError, UnauthorizedError } from "../classes/classRespons"

class booksModel extends Models{
    constructor(){
        super(sch)
    }

    async borrow(id){
        const book = await sch.findById(id)
        console.log({book})
        if (book.status == 'borrow') throw new ValidationError('Data Not Found.')
            
        book.status = 'borrow'
        await book.save();
        return { msg: 'Data updated succesfully.', data: resp }



    }

}

module.exports=booksModel