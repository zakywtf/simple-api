import Models from "../classes/classModel";
import sch from "../schemas/users";
import History from "../schemas/history";
import moment from 'moment'

class usersModel extends Models{
    constructor(){
        super(sch)
    }

    async charts(month, school_id){
        const datas = []
        
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
        // console.log({filters})
        const histories = await History.find({isDeleted: false}).where({...filters, school_id: school_id})
        // console.log({histories})

        for (let i = 0; i < histories.length; i++) {
            const h = histories[i];
            const date = moment(h.created_at).format('DD-MM-YYYY')
            const category = await this._bmiCategory(h.height, h.weight)
            datas.push({date: date, name: category, amount: 1})
        }
        console.log({datas})
        // const groupingByDates = await this._grouping(datas)
        // console.log(groupingByDates)
        // const groupingByCategory = await this._groupingName(datas)
        // console.log(groupingByCategory)

        return { msg: 'Data revenue succesfully.', data: datas }

    }

    async _bmiCategory(height, weight){
        const h = parseInt(height)
        const w = parseInt(weight)

        const bmi_score = w / ((h/100)*(h/100))
        var bmi_category = null
        if (bmi_score < 18.50) {
            bmi_category = 'Kurang Berat Badan'
        } else if (bmi_score >= 18.51 && bmi_score < 24.90) {
            bmi_category = 'Normal'
        } else if (bmi_score >= 24.91 && bmi_score < 29.90) {
            bmi_category = 'Kelebihan Berat Badan'
        } else if (bmi_score >= 29.91){
            bmi_category = 'Obesitas'
        }

        return bmi_category
    }

    async _groupingDates(array){
        const result = array.reduce((acc, item) => {
            if (!acc[item.date]) {
                acc[item.date] = []; // Inisialisasi
            }
            acc[item.date].push({ name: item.category, amount: item.amount });
            return acc;
        }, {});

        return result
    }

    async _groupingName(array){
        const result = array.reduce((acc, item) => {
            console.log({item})
            if (!acc[item.name]) {
                acc[item.name] ={ date: item.date, name: item.category, amount: item.amount }
            }
            acc[item.name] += item.amount; // Tambahkan jumlahnya
            return acc;
        }, {});

        return result
    }

    async _grouping(datas){
        const groupedData = datas.reduce((acc, item) => {
            const { date, category } = item;
            
            if (!acc[date]) {
                acc[date] = {};
            }
            
            if (!acc[date][category]) {
                acc[date][category] = 0;
            }
            
            acc[date][category]++; // Tambah jumlah produk yang sama pada tanggal tersebut
            
            return acc;
        }, {});
        
        // Ubah menjadi array jika diperlukan
        const result = Object.keys(groupedData).map(date => ({
            date,
            categories: groupedData[date]
        }));
        
        console.log(result);
    }

}

module.exports=usersModel