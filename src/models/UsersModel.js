import Models from "../classes/classModel";
import sch from "../schemas/users";
import History from "../schemas/history";
import moment from 'moment'

class usersModel extends Models{
    constructor(){
        super(sch)
    }

    async charts(month, school_id){
        const x_cat = []
        
        const d = new Date();
        let dyear = d.getFullYear();
        let dmonth = parseInt(month) + 1
        // const startDate = new Date(year, month);
        const endDate = new Date(dyear, dmonth);

        const filters = {
            created_at: {
                $gte: new Date(dyear+"-"+dmonth+"-01"),
                $lt: endDate,
            },
        };
        console.log({filters})
        const histories = await History.find({isDeleted: false}).where({...filters, school_id: school_id})
        console.log({histories})

        for (let i = 0; i < histories.length; i++) {
            const h = histories[i];
            const date = moment(h.created_at).format('DD/MM')
            x_cat.push(date)
        }

        return { msg: 'Data revenue succesfully.', data: { category: x_cat } }

    }

}

module.exports=usersModel