
// let dotenv = require('dotenv')

const bcrypt = require("bcryptjs");
const model = require('./schemas/users')
const WellnessDetail = require("./schemas/wellness_details");

const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wellness_monitoring';
const salt = 'Be5TgHbUSBDiQ04K0dE5vPwrtJKd6ilYnjGEmQ'
mongoose.connect(mongoURI, { useNewUrlParser: true });

const datas = [
    {
     "id": "2110020",
     "name": "DADANG PURNAWAN",
     "position": "Group Production 5 Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "1995-09-19",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2009008",
     "name": "LEONARDUS GILAR WIDYATAMA",
     "position": "Production Group 3 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "2001-05-01",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2102026",
     "name": "ILHAM NUR RIDHO",
     "position": "Group Production 2 Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "1999-10-06",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2101030",
     "name": "MUHAMMAD AZIZ SAPUTRA",
     "position": "Assy SP Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "2001-05-21",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2012038",
     "name": "IKHSAN PRASETYA",
     "position": "Group Production 6 Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "2000-05-17",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2008012",
     "name": "NOVIYANTO",
     "position": "Production Group 2 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1997-11-20",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2009006",
     "name": "BAYU HERMAWAN",
     "position": "Group Production 1 Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "1998-11-25",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2106008",
     "name": "AGUS SUSILO",
     "position": "Group Production 3 Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "1995-08-10",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2103008",
     "name": "TONI JANU PURNOMO",
     "position": "Assembling & Printing Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "1993-01-22",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2307013",
     "name": "WIDHI YUWONO",
     "position": "Quality Control Injection Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1989-05-10",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "9901001",
     "name": "PETRUS TEDJA HAPSORO",
     "position": "Direktur Utama - YPTI",
     "level": "Direktur Utama",
     "date_of_birth": "1968-04-27",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "9901003",
     "name": "PRASETYO YULIANTO PAULUS",
     "position": "Direktur Checking Fixture & Spare - YPTI",
     "level": "Direktur",
     "date_of_birth": "1972-07-09",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "0007001",
     "name": "YULIYATI",
     "position": "Finance, Accounting, TAX Dept. Manager - YPTI",
     "level": "Manager",
     "date_of_birth": "1975-07-10",
     "gender": "female",
     "plant": "CF&SP"
    },
    {
     "id": "0009001",
     "name": "SUTRIYONO",
     "position": "Tool Maker Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1977-12-24",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "0102009",
     "name": "STEPHANUS YUDA WIDYAWAN",
     "position": "Marketing Manager - UNICAM",
     "level": "Manager",
     "date_of_birth": "1978-01-26",
     "gender": "male",
     "plant": "UNICAM"
    },
    {
     "id": "0107006",
     "name": "NANANG YULIANTO",
     "position": "Manufacturing Dept. 3 Manager - YPTI",
     "level": "Manager",
     "date_of_birth": "1980-07-11",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "0107003",
     "name": "ROY NUR ARIFIN",
     "position": "Marketing & Sales CF&SP Foreman",
     "level": "Foreman",
     "date_of_birth": "1980-04-26",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "0301001",
     "name": "JIHNO",
     "position": "CNC Group 1 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1980-08-06",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "0407002",
     "name": "SUPONO",
     "position": "Production Manager - YCS",
     "level": "Foreman",
     "date_of_birth": "1984-03-01",
     "gender": "male",
     "plant": "YCS"
    },
    {
     "id": "0511001",
     "name": "ALEXANDER DHINO MARTINO",
     "position": "Quality Control CF & SP Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1978-03-02",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2009019",
     "name": "WAWAS SUSILO",
     "position": "Engineering Section 2 Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1992-09-16",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "0601002",
     "name": "SUMARNO",
     "position": "SETTER Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "1976-05-17",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "0701001",
     "name": "PARGIYANTO",
     "position": "Setter Group 1 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1984-09-01",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "0711001",
     "name": "ABU MASYKURI",
     "position": "Assembling & Printing Supervisor - YPTS",
     "level": "Supervisor",
     "date_of_birth": "1980-06-19",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "0712001",
     "name": "KOHARYANTO",
     "position": "Production Injection Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1984-03-24",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1002001",
     "name": "ADE SAMSUDIN",
     "position": "Manual Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1989-09-09",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "1005001",
     "name": "PURWANTO",
     "position": "Assy CF Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1984-03-08",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "0803001",
     "name": "ERFAN WIDYOSUSANTO",
     "position": "Maintenance Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1985-02-22",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "0804002",
     "name": "PIUS V CAHYO ARDI ANDONO",
     "position": "Direktur Injection - YPTI",
     "level": "Direktur",
     "date_of_birth": "1981-05-05",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1102003",
     "name": "PANCA AGUNG SUHARTO",
     "position": "PPIC CF Group Foreman  - YPTI",
     "level": "Foreman",
     "date_of_birth": "1987-01-22",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "1103003",
     "name": "NOVA STYO NUGROHO",
     "position": "Design R&D Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1991-11-09",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "0901001",
     "name": "LINDA NUR APRILIYA",
     "position": "Finance Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1987-04-26",
     "gender": "female",
     "plant": "INJECT"
    },
    {
     "id": "1104001",
     "name": "JATU ARSYAD PUTRA JANA",
     "position": "Warehouse Group 1 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1990-08-09",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "1111002",
     "name": "DORI SURYA USMAN",
     "position": "Support Dept. 1 Manager - YPTI",
     "level": "Manager",
     "date_of_birth": "1986-07-28",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "1112001",
     "name": "RORI ISWANTO",
     "position": "Design CF Group Foreman - YTPI",
     "level": "Foreman",
     "date_of_birth": "1986-10-10",
     "gender": "male",
     "plant": "TODA"
    },
    {
     "id": "1203001",
     "name": "ARIF SETYAWAN",
     "position": "Welding Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1992-11-25",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "1512003",
     "name": "EKO SIGIT APRIYANTO",
     "position": "PPIC Section 3 Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1997-04-12",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "1601004",
     "name": "HERIBERTUS DWI KRISTIANTO",
     "position": "Direktur Mold  - YPTI",
     "level": "Direktur",
     "date_of_birth": "1968-08-09",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "1604005",
     "name": "MARIA TRIWAHYUNINGSIH",
     "position": "Training Center Dept. Manager - UNICAM",
     "level": "Manager",
     "date_of_birth": "1994-10-23",
     "gender": "female",
     "plant": "UNICAM"
    },
    {
     "id": "1009001",
     "name": "TRIAS SUTRIANA AGESTIAN",
     "position": "Maintenance Mold Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1974-11-26",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1010003",
     "name": "DEVI ROHKHAYATI",
     "position": "PPIC Section 2 Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1991-12-11",
     "gender": "female",
     "plant": "INJECT"
    },
    {
     "id": "1610015",
     "name": "ARI WIBOWO",
     "position": "Manufacture Supervisor - UNICAM",
     "level": "Supervisor",
     "date_of_birth": "1983-02-14",
     "gender": "male",
     "plant": "UNICAM"
    },
    {
     "id": "1010004",
     "name": "FARID AL FATONI",
     "position": "Production Injection  Supervisor - YPTS",
     "level": "Supervisor",
     "date_of_birth": "1991-11-16",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "1103001",
     "name": "DWI HARYANTO",
     "position": "Support Dept. 2 Manager - YPTI",
     "level": "Manager",
     "date_of_birth": "1988-05-02",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1702013",
     "name": "RUSMIYATI",
     "position": "General Affair Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1994-09-29",
     "gender": "female",
     "plant": "CF&SP"
    },
    {
     "id": "1105002",
     "name": "YUDI IRWANTO",
     "position": "Logistik Jogja Group 1 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1974-09-28",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1706001",
     "name": "PEBY ARIYANTO",
     "position": "CNC Mold  Group 1 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1999-09-26",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "1707011",
     "name": "HEYDZAR BIMA PERDANA PUTRA",
     "position": "CNC Mold  Group 3 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1999-07-05",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "1708004",
     "name": "UFAN ALI BASHALIL ROIS",
     "position": "CNC Group 2 Foreman - UNICAM",
     "level": "Foreman",
     "date_of_birth": "1996-08-08",
     "gender": "male",
     "plant": "UNICAM"
    },
    {
     "id": "1602003",
     "name": "RENDY NUR CAHYO",
     "position": "Production Group 1 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1991-12-18",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1711013",
     "name": "PAULUS KURNIAJI PRABOWO SEJATI",
     "position": "Machining Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1989-02-19",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "1606013",
     "name": "BAYU AJI",
     "position": "Jishuken Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1997-01-31",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1802011",
     "name": "APRILIA RARA DEWANTI",
     "position": "Finance, Accounting, TAX Manager - UNICAM",
     "level": "Manager",
     "date_of_birth": "1993-04-04",
     "gender": "female",
     "plant": "UNICAM"
    },
    {
     "id": "1702005",
     "name": "WAHYU CAHYO WIDODO",
     "position": "Production Material Foreman",
     "level": "Foreman",
     "date_of_birth": "1989-05-05",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1811009",
     "name": "RUDI KURNIAWAN",
     "position": "Engineering Section 1 Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1994-11-25",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "1803003",
     "name": "DWI CAHYA FEBRIYANI",
     "position": "Jishuken Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1999-02-01",
     "gender": "female",
     "plant": "INJECT"
    },
    {
     "id": "1902008",
     "name": "ANIS OKPRASIANA",
     "position": "Accounting Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1995-10-21",
     "gender": "female",
     "plant": "INJECT"
    },
    {
     "id": "1905001",
     "name": "ARISTA AMARA PUTRI",
     "position": "Marketing & Sales Injection Foreman",
     "level": "Foreman",
     "date_of_birth": "2001-04-19",
     "gender": "female",
     "plant": "INJECT"
    },
    {
     "id": "1906004",
     "name": "DANANG WIJILISTYANTO",
     "position": "Quality Assurance Section 2 Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1991-08-20",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2002008",
     "name": "ALFONSUS KRISTIAN WICAKSONO",
     "position": "CNC Group 2 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1998-09-23",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2003001",
     "name": "NICOLAUS ADITYO",
     "position": "CNC Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1997-02-03",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "1906005",
     "name": "ENDEN DAUD NUGRAHA",
     "position": "PPIC Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1997-01-25",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "1605004",
     "name": "ARDHI KURNIAWAN",
     "position": "Logistik Jogja Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "1998-08-13",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2009020",
     "name": "JOKO WARDOYO",
     "position": "Direktur - YCS",
     "level": "Direktur",
     "date_of_birth": "1979-07-15",
     "gender": "male",
     "plant": "YCS"
    },
    {
     "id": "2010003",
     "name": "JOTI WAHYOGA",
     "position": "CAM CF & SP Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1998-11-07",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2010006",
     "name": "KRESZENS GB LADJAR",
     "position": "Manufacturing Dept. 1 Manager - YPTI",
     "level": "Manager",
     "date_of_birth": "1992-04-13",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2001004",
     "name": "ADE SETIYA PURWAKA",
     "position": "Material Testing & P.E. Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1995-01-29",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2009005",
     "name": "USMAN",
     "position": "Quality Control Foreman - YPTS",
     "level": "Foreman",
     "date_of_birth": "1996-02-18",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2010021",
     "name": "ARI BUDIANTO",
     "position": "Production Group 4 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1992-01-21",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2104024",
     "name": "ELRICO PRIAMBODO",
     "position": "Marketing & Sales Mold Foreman",
     "level": "Foreman",
     "date_of_birth": "1998-08-12",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "2105003",
     "name": "MUHAMMAD SYARI'ATI RAMADHANI",
     "position": "Assembling Section 1 Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1993-02-27",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2106011",
     "name": "ARIF BURHANUDIN LUTHFI",
     "position": "Design Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1993-05-08",
     "gender": "male",
     "plant": "MOLD"
    },
    {
     "id": "2010019",
     "name": "MIKHAEL RYAN INDRA HERTOMO",
     "position": "Production Engineering Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1999-01-13",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2202003",
     "name": "MUHAMMAD ISKANDAR ZULKARNAIN",
     "position": "CNC Group 4 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1992-09-28",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2102025",
     "name": "RIKY SETYAWAN",
     "position": "Maintenance Machine Group Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "1994-10-30",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2305002",
     "name": "ASWINO MAITHILA",
     "position": "HCGA Dept. Manager - YPTI",
     "level": "Manager",
     "date_of_birth": "1989-03-21",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2110017",
     "name": "AHMAD LUTHFI SETIAWAN",
     "position": "HSE Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "1994-07-17",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2310003",
     "name": "BONDHAN WISNUMURTI",
     "position": "Application Engineer Manager - UNICAM",
     "level": "Manager",
     "date_of_birth": "1982-02-15",
     "gender": "male",
     "plant": "UNICAM"
    },
    {
     "id": "2202011",
     "name": "ALOYSIUS KRISMANTO",
     "position": "Manufacturing Dept. 2 Manager - YPTI",
     "level": "Manager",
     "date_of_birth": "1980-11-17",
     "gender": "male",
     "plant": "INJECT"
    },
    {
     "id": "2412003",
     "name": "MUHAMAD AVINANSYAH",
     "position": "CNC Group 3 Foreman - YPTI",
     "level": "Foreman",
     "date_of_birth": "2000-07-20",
     "gender": "male",
     "plant": "CF&SP"
    },
    {
     "id": "2210002",
     "name": "IGNATIUS KRISNURHARYO",
     "position": "Manufacturing Injection Manager - YPTS",
     "level": "Manager",
     "date_of_birth": "1988-12-27",
     "gender": "male",
     "plant": "YPTS"
    },
    {
     "id": "2501008",
     "name": "MUHAMMAD LUQMAN SHOLIH",
     "position": "Recruitment Supervisor - YPTI",
     "level": "Supervisor",
     "date_of_birth": "2002-01-07",
     "gender": "male",
     "plant": "CF&SP"
    }
   ]

const createUsers = async () => {
    let pinHash = await bcrypt.hash('123456' + salt, 10);
    // const school_id = "671881ff935ac0941251cb48"
    const school_id = "67a036933e87747a0a5ffb7a"

    for (let i = 0; i < datas.length; i++) {
        const e = datas[i];
        const obj = { nisn: e.id, name: e.name, pin: pinHash, role: 'user', position: e.position, level: e.level, date_of_birth: e.date_of_birth, gender: e.gender, plant: e.plant, school_id: school_id}
        console.log({obj})
        const resp = await model.create(obj)
        await WellnessDetail.create({ user_id: resp._id, school_id: resp.school_id })
        
    }
}

createUsers()

model.find({},(err,resp)=>{
    console.log(resp, err, 'findone');
})