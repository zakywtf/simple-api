
// let dotenv = require('dotenv')

const bcrypt = require("bcryptjs");
const model = require('./schemas/users')
const WellnessDetail = require("./schemas/wellness_details");

const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/wellness_monitoring';
const salt = 'Be5TgHbUSBDiQ04K0dE5vPwrtJKd6ilYnjGEmQ'
mongoose.connect(mongoURI, { useNewUrlParser: true });

// const datas = [
//     {
//      "id": "2110020",
//      "name": "DADANG PURNAWAN",
//      "position": "Group Production 5 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1995-09-19",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2009008",
//      "name": "LEONARDUS GILAR WIDYATAMA",
//      "position": "Production Group 3 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "2001-05-01",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2102026",
//      "name": "ILHAM NUR RIDHO",
//      "position": "Group Production 2 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1999-10-06",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2101030",
//      "name": "MUHAMMAD AZIZ SAPUTRA",
//      "position": "Assy SP Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "2001-05-21",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2012038",
//      "name": "IKHSAN PRASETYA",
//      "position": "Group Production 6 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "2000-05-17",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2008012",
//      "name": "NOVIYANTO",
//      "position": "Production Group 2 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1997-11-20",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2009006",
//      "name": "BAYU HERMAWAN",
//      "position": "Group Production 1 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1998-11-25",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2106008",
//      "name": "AGUS SUSILO",
//      "position": "Group Production 3 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1995-08-10",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2103008",
//      "name": "TONI JANU PURNOMO",
//      "position": "Assembling & Printing Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1993-01-22",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2307013",
//      "name": "WIDHI YUWONO",
//      "position": "Quality Control Injection Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1989-05-10",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "9901001",
//      "name": "PETRUS TEDJA HAPSORO",
//      "position": "Direktur Utama - YPTI",
//      "level": "Direktur Utama",
//      "date_of_birth": "1968-04-27",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "9901003",
//      "name": "PRASETYO YULIANTO PAULUS",
//      "position": "Direktur Checking Fixture & Spare - YPTI",
//      "level": "Direktur",
//      "date_of_birth": "1972-07-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0007001",
//      "name": "YULIYATI",
//      "position": "Finance, Accounting, TAX Dept. Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1975-07-10",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0009001",
//      "name": "SUTRIYONO",
//      "position": "Tool Maker Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1977-12-24",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "0102009",
//      "name": "STEPHANUS YUDA WIDYAWAN",
//      "position": "Marketing Manager - UNICAM",
//      "level": "Manager",
//      "date_of_birth": "1978-01-26",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "0107006",
//      "name": "NANANG YULIANTO",
//      "position": "Manufacturing Dept. 3 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1980-07-11",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "0107003",
//      "name": "ROY NUR ARIFIN",
//      "position": "Marketing & Sales CF&SP Foreman",
//      "level": "Foreman",
//      "date_of_birth": "1980-04-26",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0301001",
//      "name": "JIHNO",
//      "position": "CNC Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1980-08-06",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0407002",
//      "name": "SUPONO",
//      "position": "Production Manager - YCS",
//      "level": "Foreman",
//      "date_of_birth": "1984-03-01",
//      "gender": "male",
//      "plant": "YCS"
//     },
//     {
//      "id": "0511001",
//      "name": "ALEXANDER DHINO MARTINO",
//      "position": "Quality Control CF & SP Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1978-03-02",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2009019",
//      "name": "WAWAS SUSILO",
//      "position": "Engineering Section 2 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1992-09-16",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0601002",
//      "name": "SUMARNO",
//      "position": "SETTER Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1976-05-17",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "0701001",
//      "name": "PARGIYANTO",
//      "position": "Setter Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1984-09-01",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0711001",
//      "name": "ABU MASYKURI",
//      "position": "Assembling & Printing Supervisor - YPTS",
//      "level": "Supervisor",
//      "date_of_birth": "1980-06-19",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "0712001",
//      "name": "KOHARYANTO",
//      "position": "Production Injection Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1984-03-24",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1002001",
//      "name": "ADE SAMSUDIN",
//      "position": "Manual Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1989-09-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1005001",
//      "name": "PURWANTO",
//      "position": "Assy CF Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1984-03-08",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0803001",
//      "name": "ERFAN WIDYOSUSANTO",
//      "position": "Maintenance Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1985-02-22",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0804002",
//      "name": "PIUS V CAHYO ARDI ANDONO",
//      "position": "Direktur Injection - YPTI",
//      "level": "Direktur",
//      "date_of_birth": "1981-05-05",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1102003",
//      "name": "PANCA AGUNG SUHARTO",
//      "position": "PPIC CF Group Foreman  - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1987-01-22",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1103003",
//      "name": "NOVA STYO NUGROHO",
//      "position": "Design R&D Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1991-11-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0901001",
//      "name": "LINDA NUR APRILIYA",
//      "position": "Finance Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1987-04-26",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1104001",
//      "name": "JATU ARSYAD PUTRA JANA",
//      "position": "Warehouse Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1990-08-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1111002",
//      "name": "DORI SURYA USMAN",
//      "position": "Support Dept. 1 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1986-07-28",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1112001",
//      "name": "RORI ISWANTO",
//      "position": "Design CF Group Foreman - YTPI",
//      "level": "Foreman",
//      "date_of_birth": "1986-10-10",
//      "gender": "male",
//      "plant": "TODA"
//     },
//     {
//      "id": "1203001",
//      "name": "ARIF SETYAWAN",
//      "position": "Welding Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1992-11-25",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1512003",
//      "name": "EKO SIGIT APRIYANTO",
//      "position": "PPIC Section 3 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1997-04-12",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1601004",
//      "name": "HERIBERTUS DWI KRISTIANTO",
//      "position": "Direktur Mold  - YPTI",
//      "level": "Direktur",
//      "date_of_birth": "1968-08-09",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1604005",
//      "name": "MARIA TRIWAHYUNINGSIH",
//      "position": "Training Center Dept. Manager - UNICAM",
//      "level": "Manager",
//      "date_of_birth": "1994-10-23",
//      "gender": "female",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1009001",
//      "name": "TRIAS SUTRIANA AGESTIAN",
//      "position": "Maintenance Mold Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1974-11-26",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1010003",
//      "name": "DEVI ROHKHAYATI",
//      "position": "PPIC Section 2 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1991-12-11",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1610015",
//      "name": "ARI WIBOWO",
//      "position": "Manufacture Supervisor - UNICAM",
//      "level": "Supervisor",
//      "date_of_birth": "1983-02-14",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1010004",
//      "name": "FARID AL FATONI",
//      "position": "Production Injection  Supervisor - YPTS",
//      "level": "Supervisor",
//      "date_of_birth": "1991-11-16",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "1103001",
//      "name": "DWI HARYANTO",
//      "position": "Support Dept. 2 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1988-05-02",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1702013",
//      "name": "RUSMIYATI",
//      "position": "General Affair Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1994-09-29",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1105002",
//      "name": "YUDI IRWANTO",
//      "position": "Logistik Jogja Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1974-09-28",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1706001",
//      "name": "PEBY ARIYANTO",
//      "position": "CNC Mold  Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1999-09-26",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1707011",
//      "name": "HEYDZAR BIMA PERDANA PUTRA",
//      "position": "CNC Mold  Group 3 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1999-07-05",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1708004",
//      "name": "UFAN ALI BASHALIL ROIS",
//      "position": "CNC Group 2 Foreman - UNICAM",
//      "level": "Foreman",
//      "date_of_birth": "1996-08-08",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1602003",
//      "name": "RENDY NUR CAHYO",
//      "position": "Production Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1991-12-18",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1711013",
//      "name": "PAULUS KURNIAJI PRABOWO SEJATI",
//      "position": "Machining Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1989-02-19",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1606013",
//      "name": "BAYU AJI",
//      "position": "Jishuken Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1997-01-31",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1802011",
//      "name": "APRILIA RARA DEWANTI",
//      "position": "Finance, Accounting, TAX Manager - UNICAM",
//      "level": "Manager",
//      "date_of_birth": "1993-04-04",
//      "gender": "female",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1702005",
//      "name": "WAHYU CAHYO WIDODO",
//      "position": "Production Material Foreman",
//      "level": "Foreman",
//      "date_of_birth": "1989-05-05",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1811009",
//      "name": "RUDI KURNIAWAN",
//      "position": "Engineering Section 1 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1994-11-25",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1803003",
//      "name": "DWI CAHYA FEBRIYANI",
//      "position": "Jishuken Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1999-02-01",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1902008",
//      "name": "ANIS OKPRASIANA",
//      "position": "Accounting Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1995-10-21",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1905001",
//      "name": "ARISTA AMARA PUTRI",
//      "position": "Marketing & Sales Injection Foreman",
//      "level": "Foreman",
//      "date_of_birth": "2001-04-19",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1906004",
//      "name": "DANANG WIJILISTYANTO",
//      "position": "Quality Assurance Section 2 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1991-08-20",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2002008",
//      "name": "ALFONSUS KRISTIAN WICAKSONO",
//      "position": "CNC Group 2 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1998-09-23",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2003001",
//      "name": "NICOLAUS ADITYO",
//      "position": "CNC Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1997-02-03",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1906005",
//      "name": "ENDEN DAUD NUGRAHA",
//      "position": "PPIC Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1997-01-25",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1605004",
//      "name": "ARDHI KURNIAWAN",
//      "position": "Logistik Jogja Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1998-08-13",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2009020",
//      "name": "JOKO WARDOYO",
//      "position": "Direktur - YCS",
//      "level": "Direktur",
//      "date_of_birth": "1979-07-15",
//      "gender": "male",
//      "plant": "YCS"
//     },
//     {
//      "id": "2010003",
//      "name": "JOTI WAHYOGA",
//      "position": "CAM CF & SP Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1998-11-07",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2010006",
//      "name": "KRESZENS GB LADJAR",
//      "position": "Manufacturing Dept. 1 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1992-04-13",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2001004",
//      "name": "ADE SETIYA PURWAKA",
//      "position": "Material Testing & P.E. Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1995-01-29",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2009005",
//      "name": "USMAN",
//      "position": "Quality Control Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1996-02-18",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2010021",
//      "name": "ARI BUDIANTO",
//      "position": "Production Group 4 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1992-01-21",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2104024",
//      "name": "ELRICO PRIAMBODO",
//      "position": "Marketing & Sales Mold Foreman",
//      "level": "Foreman",
//      "date_of_birth": "1998-08-12",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2105003",
//      "name": "MUHAMMAD SYARI'ATI RAMADHANI",
//      "position": "Assembling Section 1 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1993-02-27",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2106011",
//      "name": "ARIF BURHANUDIN LUTHFI",
//      "position": "Design Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1993-05-08",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2010019",
//      "name": "MIKHAEL RYAN INDRA HERTOMO",
//      "position": "Production Engineering Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1999-01-13",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2202003",
//      "name": "MUHAMMAD ISKANDAR ZULKARNAIN",
//      "position": "CNC Group 4 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1992-09-28",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2102025",
//      "name": "RIKY SETYAWAN",
//      "position": "Maintenance Machine Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1994-10-30",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2305002",
//      "name": "ASWINO MAITHILA",
//      "position": "HCGA Dept. Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1989-03-21",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2110017",
//      "name": "AHMAD LUTHFI SETIAWAN",
//      "position": "HSE Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1994-07-17",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2310003",
//      "name": "BONDHAN WISNUMURTI",
//      "position": "Application Engineer Manager - UNICAM",
//      "level": "Manager",
//      "date_of_birth": "1982-02-15",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "2202011",
//      "name": "ALOYSIUS KRISMANTO",
//      "position": "Manufacturing Dept. 2 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1980-11-17",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2412003",
//      "name": "MUHAMAD AVINANSYAH",
//      "position": "CNC Group 3 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "2000-07-20",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2210002",
//      "name": "IGNATIUS KRISNURHARYO",
//      "position": "Manufacturing Injection Manager - YPTS",
//      "level": "Manager",
//      "date_of_birth": "1988-12-27",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2501008",
//      "name": "MUHAMMAD LUQMAN SHOLIH",
//      "position": "Recruitment Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "2002-01-07",
//      "gender": "male",
//      "plant": "CF&SP"
//     }
//    ]

// const datas = [
//     {
//      "id": "1809004",
//      "name": "DANDI PRASETIYA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-01-27",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2111012",
//      "name": "WISNU SETYAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2003-05-26",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2407004",
//      "name": "ANTONIUS ANDRO ANARKO",
//      "Lokasi": "Yogyakarta",
//      "position": "Application Engineer Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1991-04-21",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1607004",
//      "name": "EKO WIDODO",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-08-17",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2308003",
//      "name": "IQBAL FATHQURREZZA",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1990-12-11",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1808012",
//      "name": "MISIDI",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1991-08-08",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2110020",
//      "name": "DADANG PURNAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Group Production 5 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1995-09-19",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2201009",
//      "name": "SETYA BUDI WIDODO",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1995-04-22",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2304002",
//      "name": "AL DIKY ROMADHONA",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1998-12-21",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2311001",
//      "name": "HAKIMATUL AZIZAH",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Assurance Section 2 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-07-08",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2401009",
//      "name": "ANGGITA DWI HANDAYANI",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-08-26",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1912026",
//      "name": "DWI ARIYANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1993-04-02",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2101011",
//      "name": "NOVINDRA RIYAN W",
//      "Lokasi": "Yogyakarta",
//      "position": "Group Production 1 Operator - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1998-01-19",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2101050",
//      "name": "RISKA SANDY PRATAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2002-01-22",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2211001",
//      "name": "ADITYA FEBRY PRASETYO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-02-23",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2211004",
//      "name": "IKA SAPTYANI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1986-02-22",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2211007",
//      "name": "WILDAN PUTRA ADMAJA",
//      "Lokasi": "Yogyakarta",
//      "position": "Group Production 1 Operator - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2003-01-03",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2209010",
//      "name": "PASCAL ALEXANDER WIHARJO",
//      "Lokasi": "Yogyakarta",
//      "position": "Training & Development Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-04-07",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2102016",
//      "name": "SA'I NUR CAHYO",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2002-05-11",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2312007",
//      "name": "DARU OKTAVIANTORO",
//      "Lokasi": "Yogyakarta",
//      "position": "Jishuken Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-10-06",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2402010",
//      "name": "AMANDA KUSUMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2001-03-26",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2405008",
//      "name": "FARRA RIZKA APRILIA",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2006-04-26",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2211008",
//      "name": "DINDA NOVIE NUR CLESTIANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1994-11-13",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2211009",
//      "name": "CANDRA WIDYANINGRUM",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1997-12-30",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1812009",
//      "name": "ABDI PRIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1998-07-10",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2008008",
//      "name": "RIZA ANGGRAENI BUDIYANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1998-12-29",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2009008",
//      "name": "LEONARDUS GILAR WIDYATAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Group 3 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "2001-05-01",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2105018",
//      "name": "RAHEL AJI PAMUNGKAS",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2001-06-12",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2211012",
//      "name": "WAHYU TRI MANUNGGAL",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2000-01-30",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2305004",
//      "name": "ENDRI SUYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1994-09-13",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2312006",
//      "name": "RISA PUTRI PROBOSARI",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2002-07-05",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2412002",
//      "name": "YOEL BEKTI NOVENTITO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Assurance Section 2 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-11-01",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2401002",
//      "name": "ANDIKA WIDAYAT",
//      "Lokasi": "Yogyakarta",
//      "position": "Group Production 2 Operator - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1995-08-27",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2309010",
//      "name": "BASIT SEPTIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1991-09-10",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2403039",
//      "name": "ZULIYA KHALIYATUZZAHROK",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-07-29",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2107006",
//      "name": "ARIF FRIANDI",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2002-10-21",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2301002",
//      "name": "SYAMSUL HADI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1995-05-01",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2307016",
//      "name": "RIKO ILMI WIBAWA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control CF & SP Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-03-23",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2301009",
//      "name": "ARYADI RUSWANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-04-04",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2301008",
//      "name": "DIANASARI MEIASTUTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1996-05-27",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2412007",
//      "name": "MAULANA MALIK FAJAR IBRAHIM",
//      "Lokasi": "Yogyakarta",
//      "position": "HSE Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-07-25",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2404008",
//      "name": "TITO BARSAH",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1998-04-13",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2402005",
//      "name": "ELLY PRASASTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2000-02-14",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2402006",
//      "name": "LIANA ISWATI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-06-01",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2201007",
//      "name": "RISKA ARYANI",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1995-10-13",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2207004",
//      "name": "ARI WIBOWO",
//      "Lokasi": "Yogyakarta",
//      "position": "SETTER Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1995-01-27",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2410011",
//      "name": "YOVIE TJHANGESTI",
//      "Lokasi": "Yogyakarta",
//      "position": "FAT Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1999-07-05",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2410012",
//      "name": "NAUFAL ZACKY AMADA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Engineering Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-11-21",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2011015",
//      "name": "NISRINA SHAFAYANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2001-08-27",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2305005",
//      "name": "EVAN FEBRIANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Automation & IT Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-02-14",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2011008",
//      "name": "MARCELINO NALENDRA NAMASKARA SWASANA PUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "Assembling Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1999-02-04",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2102011",
//      "name": "WIDIGDA BAYU ASMARADIKA",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2000-04-29",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2103001",
//      "name": "DIAN AGUS PRI HANDOKO",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1997-08-12",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2208021",
//      "name": "FITRIA NUUR ANGGRAINI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1999-05-10",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2309004",
//      "name": "VEBI EKA SAPUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2004-07-22",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2102026",
//      "name": "ILHAM NUR RIDHO",
//      "Lokasi": "Yogyakarta",
//      "position": "Group Production 2 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1999-10-06",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2402020",
//      "name": "ITA LUKYSANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1995-05-15",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2202005",
//      "name": "GALIH SURYO SURYADI",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-04-25",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2203006",
//      "name": "ANGGRAINI PUSPITA NINGRUM",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-08-14",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2208020",
//      "name": "DIWAN KHAERU RIZAL",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2002-08-30",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2101030",
//      "name": "MUHAMMAD AZIZ SAPUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "Assy SP Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "2001-05-21",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2101040",
//      "name": "MELITA PUJI PRAMUDANI",
//      "Lokasi": "Yogyakarta",
//      "position": "Accounting Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-07-30",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2407026",
//      "name": "ANGGITA PUTRI SEKARINGTYAS",
//      "Lokasi": "Yogyakarta",
//      "position": "Secretary Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-12-03",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2402026",
//      "name": "AGUNG CATUR BUDI AJI",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-07-20",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2209012",
//      "name": "ALFIAN SYIHAB",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-04-17",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2403037",
//      "name": "ARUM SETYANING TIYAS",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales Injection Staff",
//      "level": "Staff",
//      "date_of_birth": "1998-03-13",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2204001",
//      "name": "HENI DWI ASTUTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1997-10-24",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2309017",
//      "name": "MEIDIANA AZZAHRA KHAIRANY",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2001-05-09",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2012038",
//      "name": "IKHSAN PRASETYA",
//      "Lokasi": "Yogyakarta",
//      "position": "Group Production 6 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "2000-05-17",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2407003",
//      "name": "ALFIAN SUHENDRO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1996-10-02",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2410009",
//      "name": "HANIFAH ISTRI JAUHARI",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales Injection Staff",
//      "level": "Staff",
//      "date_of_birth": "1997-05-20",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2012031",
//      "name": "MARGIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "New Dev. Project Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-03-14",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2309011",
//      "name": "WIRANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1981-09-10",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2309014",
//      "name": "OKTAN ANANDA SAPUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2004-10-05",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2402008",
//      "name": "ANDRE ALVIN POLII",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC CF Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-04-19",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2402009",
//      "name": "RIDWAN FANDI NUGROHO",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC CF Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1997-12-11",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2402019",
//      "name": "HANIFAN NUGROHO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control CF & SP Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-03-01",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2303004",
//      "name": "ANKAS PAMASTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Design Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-02-19",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2303005",
//      "name": "ARDI WARIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales Mold Staff",
//      "level": "Staff",
//      "date_of_birth": "1996-12-04",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2303006",
//      "name": "ARI DWI PURNAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Design Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-07-16",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2101053",
//      "name": "ANDRI NURCAHYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-01-18",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1905002",
//      "name": "SHOLIKIN",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1992-07-25",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2208003",
//      "name": "SIGIT NURTANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "SETTER Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1998-03-14",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2208013",
//      "name": "DADAN FAIS HASBULLAH",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1991-09-19",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2311007",
//      "name": "ANANDA BAGAS ARDHORA",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-09-17",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2403034",
//      "name": "MISBAH RAJIF IBRAHIM",
//      "Lokasi": "Yogyakarta",
//      "position": "Design SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-06-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2409001",
//      "name": "CHRISTIA HANDIKA JAYA",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC CF Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2002-12-13",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2401011",
//      "name": "SITI LUTFI ANA",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Injection Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1999-10-21",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2008012",
//      "name": "NOVIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Group 2 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1997-11-20",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2009006",
//      "name": "BAYU HERMAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Group Production 1 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1998-11-25",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2105013",
//      "name": "ILHAM NUR SETYAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1998-11-23",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2106008",
//      "name": "AGUS SUSILO",
//      "Lokasi": "Yogyakarta",
//      "position": "Group Production 3 Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1995-08-10",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2212003",
//      "name": "KUNTORODJATI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-05-28",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2109028",
//      "name": "ARDHIANSYAH WAHYU PRAYOGA",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2002-04-27",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2406001",
//      "name": "TSANIA QURROTA A'YUN",
//      "Lokasi": "Yogyakarta",
//      "position": "Subcon Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-10-03",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1108004",
//      "name": "AGUSTINUS TATANG INDRASTA",
//      "Lokasi": "Yogyakarta",
//      "position": "Trainer Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1968-05-28",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1906002",
//      "name": "NISA PITRIYANA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1997-07-17",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2009018",
//      "name": "AZIIZ PRIYONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-12-08",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2103028",
//      "name": "ANDRI KUSTANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-08-27",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2103008",
//      "name": "TONI JANU PURNOMO",
//      "Lokasi": "Yogyakarta",
//      "position": "Assembling & Printing Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1993-01-22",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2207001",
//      "name": "ADITYA FERI ALKAROSI",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-06-27",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2207005",
//      "name": "FANDIKA YOGA PRATAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-04-10",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2307013",
//      "name": "WIDHI YUWONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1989-05-10",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2307017",
//      "name": "ABHIRAMA CETTA LINTAR SOENDORO",
//      "Lokasi": "Yogyakarta",
//      "position": "Design R&D Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-06-26",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2307018",
//      "name": "DANDI RIZQI NURFATTAH",
//      "Lokasi": "Yogyakarta",
//      "position": "Design R&D Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-01-20",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2102028",
//      "name": "DESAN NURWITAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1991-12-07",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2103004",
//      "name": "ARISFA YUNIANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-06-12",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2305003",
//      "name": "NURUL RISMAWATI",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-01-26",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2209025",
//      "name": "MUHAMMAD NAJMUDDIN",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2003-07-23",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2410010",
//      "name": "DYONISIUS RIZIAN ADI PRABOWO",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales CF&SP Staff",
//      "level": "Staff",
//      "date_of_birth": "1997-10-06",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2407002",
//      "name": "IHZA TIARA LAILI SOFIA",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales Mold Staff",
//      "level": "Staff",
//      "date_of_birth": "1998-12-21",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2309016",
//      "name": "KRESNA DIANSYAH",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2003-12-28",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2404003",
//      "name": "SANDY SETIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1997-06-02",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "9901001",
//      "name": "PETRUS TEDJA HAPSORO",
//      "Lokasi": "Yogyakarta",
//      "position": "Direktur Utama - YPTI",
//      "level": "Direktur Utama",
//      "date_of_birth": "1968-04-27",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "9901003",
//      "name": "PRASETYO YULIANTO PAULUS",
//      "Lokasi": "Yogyakarta",
//      "position": "Direktur Checking Fixture & Spare - YPTI",
//      "level": "Direktur",
//      "date_of_birth": "1972-07-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0003005",
//      "name": "SAIFUL ANWAR",
//      "Lokasi": "Yogyakarta",
//      "position": "Application Engineer Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1973-11-17",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "0007001",
//      "name": "YULIYATI",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance, Accounting, TAX Dept. Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1975-07-10",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0009001",
//      "name": "SUTRIYONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Tool Maker Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1977-12-24",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "0102009",
//      "name": "STEPHANUS YUDA WIDYAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing Manager - UNICAM",
//      "level": "Manager",
//      "date_of_birth": "1978-01-26",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "0102006",
//      "name": "SUMARNO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1970-04-15",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0107006",
//      "name": "NANANG YULIANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Manufacturing Dept. 3 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1980-07-11",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "0107001",
//      "name": "DWI ARIANTIK",
//      "Lokasi": "Yogyakarta",
//      "position": "CF & SP Procurement Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1981-01-07",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0107002",
//      "name": "INDRO HARTONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Application Engineer Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1979-06-04",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "0107003",
//      "name": "ROY NUR ARIFIN",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales CF&SP Foreman",
//      "level": "Foreman",
//      "date_of_birth": "1980-04-26",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0111001",
//      "name": "SOFYANI SUSANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC CF Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1981-09-07",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0201001",
//      "name": "ARIS SUTOPO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1977-11-03",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0301001",
//      "name": "JIHNO",
//      "Lokasi": "Yogyakarta",
//      "position": "CNC Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1980-08-06",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0307001",
//      "name": "MULYADI",
//      "Lokasi": "Yogyakarta",
//      "position": "Application Engineer Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1982-07-16",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "0407002",
//      "name": "SUPONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Manager - YCS",
//      "level": "Foreman",
//      "date_of_birth": "1984-03-01",
//      "gender": "male",
//      "plant": "YCS"
//     },
//     {
//      "id": "0511001",
//      "name": "ALEXANDER DHINO MARTINO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control CF & SP Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1978-03-02",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1810005",
//      "name": "PUNGKI MARADONA",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-05-22",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0603001",
//      "name": "BETTY KARTIKA SILVYANA",
//      "Lokasi": "Yogyakarta",
//      "position": "Invoicing Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1980-03-30",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2009019",
//      "name": "WAWAS SUSILO",
//      "Lokasi": "Yogyakarta",
//      "position": "Engineering Section 2 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1992-09-16",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0706001",
//      "name": "ROBERTUS ERIG BASTIAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Design CF Group Staff - YTPI",
//      "level": "Staff",
//      "date_of_birth": "1984-07-20",
//      "gender": "male",
//      "plant": "TODA"
//     },
//     {
//      "id": "2206008",
//      "name": "SRI LESTARI",
//      "Lokasi": "Yogyakarta",
//      "position": "FAT Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1999-03-14",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "1707010",
//      "name": "SUMARYONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-11-16",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1907005",
//      "name": "KARIM MUHAMAD SHODIQ",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-06-22",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0102007",
//      "name": "AGUS SISWAYA",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1972-04-18",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0102005",
//      "name": "SUKARDI",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1975-01-28",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0601002",
//      "name": "SUMARNO",
//      "Lokasi": "Yogyakarta",
//      "position": "SETTER Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1976-05-17",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "0701001",
//      "name": "PARGIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1984-09-01",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0808002",
//      "name": "SUKASDI",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1976-09-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0708001",
//      "name": "RISDIAN MULYONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Design & Development Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1983-08-20",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0906004",
//      "name": "ANDREAS TRI WINARTO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1988-10-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0906003",
//      "name": "ANTONIUS TRI WINARDI",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1988-10-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0906002",
//      "name": "ROHMAD ANDRI ADI",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1987-05-10",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0908001",
//      "name": "CANDRA HARYANTA",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1991-10-04",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0711001",
//      "name": "ABU MASYKURI",
//      "Lokasi": "Yogyakarta",
//      "position": "Assembling & Printing Supervisor - YPTS",
//      "level": "Supervisor",
//      "date_of_birth": "1980-06-19",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "0712001",
//      "name": "KOHARYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Injection Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1984-03-24",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0912001",
//      "name": "AGUS PRASETYO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1985-08-19",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1002001",
//      "name": "ADE SAMSUDIN",
//      "Lokasi": "Yogyakarta",
//      "position": "Manual Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1989-09-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1005001",
//      "name": "PURWANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Assy CF Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1984-03-08",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0802002",
//      "name": "YOHANES IWAN SETIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales Injection Staff",
//      "level": "Staff",
//      "date_of_birth": "1977-03-01",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "0803001",
//      "name": "ERFAN WIDYOSUSANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1985-02-22",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1010002",
//      "name": "CHRISTI SETIAJI",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1989-09-19",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0804002",
//      "name": "PIUS V CAHYO ARDI ANDONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Direktur Injection - YPTI",
//      "level": "Direktur",
//      "date_of_birth": "1981-05-05",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1709010",
//      "name": "YULIATUN",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1983-09-20",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1103002",
//      "name": "HERIBERTUS SUGIARTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Warehouse Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1977-09-16",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1102001",
//      "name": "STEPHANUS PAWOKO GAUTAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control CF & SP Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1976-01-28",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1102002",
//      "name": "DHEDHIT SUTRISNO",
//      "Lokasi": "Yogyakarta",
//      "position": "Warehouse Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1989-12-30",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1102003",
//      "name": "PANCA AGUNG SUHARTO",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC CF Group Foreman  - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1987-01-22",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0808001",
//      "name": "SRI BENARSO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1974-04-03",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1103003",
//      "name": "NOVA STYO NUGROHO",
//      "Lokasi": "Yogyakarta",
//      "position": "Design R&D Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1991-11-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0901001",
//      "name": "LINDA NUR APRILIYA",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1987-04-26",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1104001",
//      "name": "JATU ARSYAD PUTRA JANA",
//      "Lokasi": "Yogyakarta",
//      "position": "Warehouse Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1990-08-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "0910003",
//      "name": "HERMANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1973-02-05",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1107001",
//      "name": "KELIK SETIYA ENDARTA",
//      "Lokasi": "Yogyakarta",
//      "position": "Design CF Group Staff - YTPI",
//      "level": "Staff",
//      "date_of_birth": "1979-07-30",
//      "gender": "male",
//      "plant": "TODA"
//     },
//     {
//      "id": "0910007",
//      "name": "DANANG SETIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1985-09-24",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1109001",
//      "name": "MARYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Warehouse Mold Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1985-03-24",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1111003",
//      "name": "BARUDIN WIDODO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control CF & SP Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1988-09-29",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1111002",
//      "name": "DORI SURYA USMAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Support Dept. 1 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1986-07-28",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1112001",
//      "name": "RORI ISWANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Design CF Group Foreman - YTPI",
//      "level": "Foreman",
//      "date_of_birth": "1986-10-10",
//      "gender": "male",
//      "plant": "TODA"
//     },
//     {
//      "id": "1203001",
//      "name": "ARIF SETYAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Welding Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1992-11-25",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1204003",
//      "name": "A.TYAS EDI PRABOWO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1987-02-10",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1209002",
//      "name": "MUH HARYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1985-09-13",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1301001",
//      "name": "JATMIKO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1987-10-24",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1302001",
//      "name": "NANIK SUYANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC CF Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1985-04-19",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1311001",
//      "name": "FERY SETYAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1991-10-12",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1311002",
//      "name": "HILMAN ZUHRI",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1988-05-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1409006",
//      "name": "ANDI TYA NANDA SAPUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1983-08-01",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1509002",
//      "name": "NUGROHO SAPUTRO",
//      "Lokasi": "Yogyakarta",
//      "position": "Design Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1994-03-07",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1510001",
//      "name": "PARTONO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1974-07-15",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1510003",
//      "name": "RONI DERMAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1994-02-15",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1510008",
//      "name": "SIGIT PRAMANA PUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1992-08-20",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1510010",
//      "name": "ERICK ADI NUGRAHA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control CF & SP Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-01-08",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1512003",
//      "name": "EKO SIGIT APRIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC Section 3 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1997-04-12",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1601004",
//      "name": "HERIBERTUS DWI KRISTIANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Direktur Mold  - YPTI",
//      "level": "Direktur",
//      "date_of_birth": "1968-08-09",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1008001",
//      "name": "ANDRI RAHARJO",
//      "Lokasi": "Yogyakarta",
//      "position": "Setter Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1990-10-14",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1603001",
//      "name": "AHMAD KHOTIB ISNAENI",
//      "Lokasi": "Yogyakarta",
//      "position": "Design SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1989-03-04",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1604005",
//      "name": "MARIA TRIWAHYUNINGSIH",
//      "Lokasi": "Yogyakarta",
//      "position": "Training Center Dept. Manager - UNICAM",
//      "level": "Manager",
//      "date_of_birth": "1994-10-23",
//      "gender": "female",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1009001",
//      "name": "TRIAS SUTRIANA AGESTIAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1974-11-26",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1607011",
//      "name": "HERI PRASETYO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1995-04-04",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1010003",
//      "name": "DEVI ROHKHAYATI",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC Section 2 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1991-12-11",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1610015",
//      "name": "ARI WIBOWO",
//      "Lokasi": "Yogyakarta",
//      "position": "Manufacture Supervisor - UNICAM",
//      "level": "Supervisor",
//      "date_of_birth": "1983-02-14",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1610017",
//      "name": "FIRMAN DWI PRASETYO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-04-19",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1612010",
//      "name": "AGUS TRI NUGROHO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1995-08-19",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1010004",
//      "name": "FARID AL FATONI",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Injection  Supervisor - YPTS",
//      "level": "Supervisor",
//      "date_of_birth": "1991-11-16",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "1103001",
//      "name": "DWI HARYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Support Dept. 2 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1988-05-02",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1702012",
//      "name": "WAHYU KURNIADI",
//      "Lokasi": "Yogyakarta",
//      "position": "Warehouse Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-05-13",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1702013",
//      "name": "RUSMIYATI",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1994-09-29",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1105002",
//      "name": "YUDI IRWANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1974-09-28",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1706001",
//      "name": "PEBY ARIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "CNC Mold  Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1999-09-26",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1707006",
//      "name": "SIGIT RIYADI",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1992-04-06",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1707011",
//      "name": "HEYDZAR BIMA PERDANA PUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "CNC Mold  Group 3 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1999-07-05",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1708004",
//      "name": "UFAN ALI BASHALIL ROIS",
//      "Lokasi": "Yogyakarta",
//      "position": "CNC Group 2 Foreman - UNICAM",
//      "level": "Foreman",
//      "date_of_birth": "1996-08-08",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1709012",
//      "name": "AGUSTINUS BUDI SANTOSO",
//      "Lokasi": "Yogyakarta",
//      "position": "Tool Room 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1988-03-19",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1108001",
//      "name": "NANANG PURWADI",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1983-07-07",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1602003",
//      "name": "RENDY NUR CAHYO",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Group 1 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1991-12-18",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1711013",
//      "name": "PAULUS KURNIAJI PRABOWO SEJATI",
//      "Lokasi": "Yogyakarta",
//      "position": "Machining Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1989-02-19",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1606013",
//      "name": "BAYU AJI",
//      "Lokasi": "Yogyakarta",
//      "position": "Jishuken Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1997-01-31",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1802011",
//      "name": "APRILIA RARA DEWANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance, Accounting, TAX Manager - UNICAM",
//      "level": "Manager",
//      "date_of_birth": "1993-04-04",
//      "gender": "female",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1610011",
//      "name": "ABDUL BASRI",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1992-05-19",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1803013",
//      "name": "SYAIFUL AZHAR ARTIANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Design Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1990-09-10",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1806005",
//      "name": "MUHAMMAD IQBAL RIZA FEBRIANSYAH",
//      "Lokasi": "Yogyakarta",
//      "position": "Design CF Group Staff - YTPI",
//      "level": "Staff",
//      "date_of_birth": "2000-02-24",
//      "gender": "male",
//      "plant": "TODA"
//     },
//     {
//      "id": "1806003",
//      "name": "DYAH RIZKY RAHMAWATI",
//      "Lokasi": "Yogyakarta",
//      "position": "Recruitment Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-05-17",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1808002",
//      "name": "FAJAR IRAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control CF & SP Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-04-24",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1702001",
//      "name": "NANANG ASNAWI",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1987-02-28",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1809013",
//      "name": "JUMADI",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1972-01-25",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1702005",
//      "name": "WAHYU CAHYO WIDODO",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Material Foreman",
//      "level": "Foreman",
//      "date_of_birth": "1989-05-05",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1703001",
//      "name": "NOVITA KURNIAWATI",
//      "Lokasi": "Yogyakarta",
//      "position": "ISO Staff Injection - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-11-18",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1810020",
//      "name": "DESELA RIA ANGGRAINI",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales CF&SP Staff",
//      "level": "Staff",
//      "date_of_birth": "1996-12-24",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1811001",
//      "name": "GIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1991-11-27",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1705002",
//      "name": "HARTONO",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1975-03-08",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1811009",
//      "name": "RUDI KURNIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Engineering Section 1 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1994-11-25",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1710001",
//      "name": "SEPTIAN WAHYUDI",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1992-09-24",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1812016",
//      "name": "ALFIN ROHMAN SAIFUDIN",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-10-30",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1710009",
//      "name": "ZURFAN SETIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-06-09",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1801003",
//      "name": "MIF TAKHUL HUDA",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1978-10-12",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1902010",
//      "name": "RIA PUTRI BETSIANA",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales CF&SP Staff",
//      "level": "Staff",
//      "date_of_birth": "1997-06-01",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1903005",
//      "name": "TAUFIK TRI PRASETYO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1994-03-18",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1803003",
//      "name": "DWI CAHYA FEBRIYANI",
//      "Lokasi": "Yogyakarta",
//      "position": "Jishuken Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1999-02-01",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1808003",
//      "name": "FERI YOGA PURNAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1994-02-04",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1809021",
//      "name": "ERWAN SURYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1995-06-26",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1810002",
//      "name": "FIGUR BAGUS ARYA DWI PANGGA",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1994-02-03",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1907008",
//      "name": "AGUSTINUS DEDY KURNIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Warehouse Group 1 Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-08-01",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1811002",
//      "name": "LAELA SETYANINGRUM",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Injection Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-02-05",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1812015",
//      "name": "HENDRA YULIANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-07-02",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1911010",
//      "name": "EKO SULISTIONO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1988-11-06",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1911024",
//      "name": "L.TRIYUNI SULISTYARINI",
//      "Lokasi": "Yogyakarta",
//      "position": "Mold Procurement Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-06-21",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "1912016",
//      "name": "ADAM FERDIAN FARIZKY",
//      "Lokasi": "Yogyakarta",
//      "position": "Design CF Group Staff - YTPI",
//      "level": "Staff",
//      "date_of_birth": "1996-06-13",
//      "gender": "male",
//      "plant": "TODA"
//     },
//     {
//      "id": "1902008",
//      "name": "ANIS OKPRASIANA",
//      "Lokasi": "Yogyakarta",
//      "position": "Accounting Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1995-10-21",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1912034",
//      "name": "TITO YOSI RISMANA",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-03-05",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1904021",
//      "name": "YUDHA SATRIATAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-11-28",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1905001",
//      "name": "ARISTA AMARA PUTRI",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales Injection Foreman",
//      "level": "Foreman",
//      "date_of_birth": "2001-04-19",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1906004",
//      "name": "DANANG WIJILISTYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Assurance Section 2 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1991-08-20",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2002006",
//      "name": "RETNO ANGGASARI",
//      "Lokasi": "Yogyakarta",
//      "position": "Accounting Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-08-25",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2002008",
//      "name": "ALFONSUS KRISTIAN WICAKSONO",
//      "Lokasi": "Yogyakarta",
//      "position": "CNC Group 2 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1998-09-23",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2003001",
//      "name": "NICOLAUS ADITYO",
//      "Lokasi": "Yogyakarta",
//      "position": "CNC Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1997-02-03",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1906005",
//      "name": "ENDEN DAUD NUGRAHA",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1997-01-25",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2008016",
//      "name": "SUWANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1992-11-10",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1605004",
//      "name": "ARDHI KURNIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Logistik Jogja Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1998-08-13",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2009020",
//      "name": "JOKO WARDOYO",
//      "Lokasi": "Yogyakarta",
//      "position": "Direktur - YCS",
//      "level": "Direktur",
//      "date_of_birth": "1979-07-15",
//      "gender": "male",
//      "plant": "YCS"
//     },
//     {
//      "id": "2010003",
//      "name": "JOTI WAHYOGA",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM CF & SP Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1998-11-07",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2010006",
//      "name": "KRESZENS GB LADJAR",
//      "Lokasi": "Yogyakarta",
//      "position": "Manufacturing Dept. 1 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1992-04-13",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "1802032",
//      "name": "EBNU NURYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "SETTER Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1984-11-30",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "1911039",
//      "name": "ANGGARA DOVI PRATAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "New Dev. Project Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1998-06-09",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "1912019",
//      "name": "DANIZA EKA FADHILLA",
//      "Lokasi": "Yogyakarta",
//      "position": "ISO Staff Injection - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1995-01-04",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2001001",
//      "name": "DIMAS ALARINTO",
//      "Lokasi": "Yogyakarta",
//      "position": "PPIC Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1988-04-11",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2011007",
//      "name": "ROHMIATUN",
//      "Lokasi": "Yogyakarta",
//      "position": "FAT Staff - YCS",
//      "level": "Staff",
//      "date_of_birth": "1997-02-01",
//      "gender": "female",
//      "plant": "YCS"
//     },
//     {
//      "id": "2001004",
//      "name": "ADE SETIYA PURWAKA",
//      "Lokasi": "Yogyakarta",
//      "position": "Material Testing & P.E. Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1995-01-29",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2012025",
//      "name": "HERU WIBOWO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1983-11-29",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "1911026",
//      "name": "LAILI NISFU FADHILAH",
//      "Lokasi": "Yogyakarta",
//      "position": "Invoicing Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-12-26",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2101034",
//      "name": "FATHKAN RAHMAT DIYANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "CAM Mold Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-08-09",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2102018",
//      "name": "ANOM SADEWO",
//      "Lokasi": "Yogyakarta",
//      "position": "Design SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1995-01-02",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2008015",
//      "name": "DANANG BUDIARTO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1984-11-18",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2009005",
//      "name": "USMAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Control Foreman - YPTS",
//      "level": "Foreman",
//      "date_of_birth": "1996-02-18",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2010018",
//      "name": "NINDYA VARA DHENINTA",
//      "Lokasi": "Yogyakarta",
//      "position": "FAT Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1998-08-12",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2102007",
//      "name": "RADEN RORO ROSTRI ANISA NUR AINI",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-11-09",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2010021",
//      "name": "ARI BUDIANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Group 4 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1992-01-21",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2104024",
//      "name": "ELRICO PRIAMBODO",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales Mold Foreman",
//      "level": "Foreman",
//      "date_of_birth": "1998-08-12",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2105003",
//      "name": "MUHAMMAD SYARI'ATI RAMADHANI",
//      "Lokasi": "Yogyakarta",
//      "position": "Assembling Section 1 Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1993-02-27",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2106011",
//      "name": "ARIF BURHANUDIN LUTHFI",
//      "Lokasi": "Yogyakarta",
//      "position": "Design Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1993-05-08",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2010019",
//      "name": "MIKHAEL RYAN INDRA HERTOMO",
//      "Lokasi": "Yogyakarta",
//      "position": "Production Engineering Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1999-01-13",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2110005",
//      "name": "JOANES KHRISNA SAPUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "Software Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1993-05-18",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "2110006",
//      "name": "NOOR AZIZAH OCTAVIANA",
//      "Lokasi": "Yogyakarta",
//      "position": "Tax Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-10-29",
//      "gender": "female",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2010020",
//      "name": "VINCENTIUS YANUAR PUJI RAHARJO",
//      "Lokasi": "Yogyakarta",
//      "position": "Company Improvement Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-01-02",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2201010",
//      "name": "CORNELIA MAYA KUSUMA DEWI",
//      "Lokasi": "Yogyakarta",
//      "position": "ISO Staff Mold - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1997-09-17",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2201011",
//      "name": "MIFTA PRIANI FATIKA SARI",
//      "Lokasi": "Yogyakarta",
//      "position": "TPR Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1996-01-10",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2011014",
//      "name": "ELISABETH YUNIAR KURNIASARI",
//      "Lokasi": "Yogyakarta",
//      "position": "Purchasing Injection Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1997-06-09",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2202003",
//      "name": "MUHAMMAD ISKANDAR ZULKARNAIN",
//      "Lokasi": "Yogyakarta",
//      "position": "CNC Group 4 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1992-09-28",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2202007",
//      "name": "IGNASIUS DINANG YUDRA NANDA",
//      "Lokasi": "Yogyakarta",
//      "position": "Design SP Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-07-11",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2203007",
//      "name": "MARTINA HENDA APRITASARI",
//      "Lokasi": "Yogyakarta",
//      "position": "Training Center Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "1999-04-10",
//      "gender": "female",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "2012028",
//      "name": "DWI SUKOCO",
//      "Lokasi": "Yogyakarta",
//      "position": "SETTER Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2000-04-16",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2102024",
//      "name": "RAKHA BAGUS HENDRAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Mold Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1993-11-24",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2102025",
//      "name": "RIKY SETYAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "1994-10-30",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2102023",
//      "name": "SUSANTO HARI PRASETYO",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1995-02-07",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2305002",
//      "name": "ASWINO MAITHILA",
//      "Lokasi": "Yogyakarta",
//      "position": "HCGA Dept. Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1989-03-21",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2104011",
//      "name": "THERESIA INDRA KUSMARTANTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Injection Procurement Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1983-03-01",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2107001",
//      "name": "JELA ANENTASARI",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1994-07-11",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2110017",
//      "name": "AHMAD LUTHFI SETIAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "HSE Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "1994-07-17",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2310001",
//      "name": "CAHYO SAPUTRO",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - UNICAM",
//      "level": "Staff",
//      "date_of_birth": "2001-02-02",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "2310003",
//      "name": "BONDHAN WISNUMURTI",
//      "Lokasi": "Yogyakarta",
//      "position": "Application Engineer Manager - UNICAM",
//      "level": "Manager",
//      "date_of_birth": "1982-02-15",
//      "gender": "male",
//      "plant": "UNICAM"
//     },
//     {
//      "id": "2403026",
//      "name": "BINTANG BAGASKARA",
//      "Lokasi": "Yogyakarta",
//      "position": "Marketing & Sales CF&SP Staff",
//      "level": "Staff",
//      "date_of_birth": "1995-04-06",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2202011",
//      "name": "ALOYSIUS KRISMANTO",
//      "Lokasi": "Yogyakarta",
//      "position": "Manufacturing Dept. 2 Manager - YPTI",
//      "level": "Manager",
//      "date_of_birth": "1980-11-17",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2206007",
//      "name": "ESTER ROSA SEPTIAYUDI",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1986-09-21",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2411002",
//      "name": "ZESA WULANDARI",
//      "Lokasi": "Yogyakarta",
//      "position": "Finance Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-05-06",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2411001",
//      "name": "PUPUT ADI SAPUTRA",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-12-06",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2208024",
//      "name": "TAUFIKO KATELA",
//      "Lokasi": "Yogyakarta",
//      "position": "Quality Engineering Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1993-10-21",
//      "gender": "female",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2412003",
//      "name": "MUHAMAD AVINANSYAH",
//      "Lokasi": "Yogyakarta",
//      "position": "CNC Group 3 Foreman - YPTI",
//      "level": "Foreman",
//      "date_of_birth": "2000-07-20",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2412004",
//      "name": "DODIT TEGUH ARI WIBOWO",
//      "Lokasi": "Quality Control CF & SP Staff - YPTI",
//      "position": "Quality Control CF & SP Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1988-11-09",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2210002",
//      "name": "IGNATIUS KRISNURHARYO",
//      "Lokasi": "Yogyakarta",
//      "position": "Manufacturing Injection Manager - YPTS",
//      "level": "Manager",
//      "date_of_birth": "1988-12-27",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2308001",
//      "name": "SRI HERIYANI",
//      "Lokasi": "Yogyakarta",
//      "position": "Purchasing Injection Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1989-03-17",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2309005",
//      "name": "RAFIKA HAKIM",
//      "Lokasi": "Yogyakarta",
//      "position": "Recruitment Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "2000-11-07",
//      "gender": "female",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2412008",
//      "name": "GUSTI AYU MUTIARINI",
//      "Lokasi": "Yogyakarta",
//      "position": "Recruitment Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2001-08-29",
//      "gender": "male",
//      "plant": "CF&SP"
//     },
//     {
//      "id": "2309007",
//      "name": "ANDIKA SETYA PRATAMA",
//      "Lokasi": "Yogyakarta",
//      "position": "General Affair Staff - YPTS",
//      "level": "Staff",
//      "date_of_birth": "1996-03-07",
//      "gender": "male",
//      "plant": "YPTS"
//     },
//     {
//      "id": "2501002",
//      "name": "ANDHIKA AJI KUSUMA",
//      "Lokasi": "Yogyakarta",
//      "position": "Design Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "2000-06-06",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2501001",
//      "name": "MIKHAEL AGNI LAKSAMANA YUDHA",
//      "Lokasi": "Yogyakarta",
//      "position": "Design Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1997-09-06",
//      "gender": "female",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2501003",
//      "name": "DIANDRA ARIFIANA",
//      "Lokasi": "Yogyakarta",
//      "position": "ISO Staff Mold - YPTI",
//      "level": "Staff",
//      "date_of_birth": "1999-02-28",
//      "gender": "male",
//      "plant": "MOLD"
//     },
//     {
//      "id": "2501004",
//      "name": "RUDI SETYAWAN",
//      "Lokasi": "Yogyakarta",
//      "position": "Maintenance Machine Group Staff - YPTI",
//      "level": "Staff",
//      "date_of_birth": "31-Mar-1993",
//      "gender": "male",
//      "plant": "INJECT"
//     },
//     {
//      "id": "2501008",
//      "name": "MUHAMMAD LUQMAN SHOLIH",
//      "Lokasi": "Yogyakarta",
//      "position": "Recruitment Supervisor - YPTI",
//      "level": "Supervisor",
//      "date_of_birth": "7-Jan-2002",
//      "gender": "male",
//      "plant": "CF&SP"
//     }
//    ]

const datas = [
    {
        "no": 1,
        "id": "2412012",
        "name": "DIMAS SATRIAWAN PUTRA",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1996-11-17",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 2,
        "id": " 2412013",
        "name": "TRI WIYADI",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1989-04-19",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 3,
        "id": "1812008",
        "name": "SARWY AGUS FERDIAN",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1992-08-17",
        "plant": "INJECT",
        "gender": "female"
       },
       {
        "no": 4,
        "id": "2405001",
        "name": "SUTRIANTI",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-08-06",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 5,
        "id": "2101001",
        "name": "ADITYA DICKY SETIAWAN",
        "position": "Production Material Operator",
        "level": "Operator",
        "date_of_birth": "2000-01-05",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 6,
        "id": "2101006",
        "name": "ANOM MARGIANTO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1995-09-15",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 7,
        "id": "2111009",
        "name": "DENY KURNIAWAN",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-11-14",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 8,
        "id": "2308009",
        "name": "ALVENIUS ERVAN WIJAYA",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2005-06-22",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 9,
        "id": "2308020",
        "name": "LORENTIUS DIAN SADEWA",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2005-07-01",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 10,
        "id": "1901004",
        "name": "NUR KARTIKA",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1990-11-01",
        "plant": "INJECT",
        "gender": "female"
       },
       {
        "no": 11,
        "id": "1911044",
        "name": "SRI MULYADI",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1992-07-07",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 12,
        "id": "1911045",
        "name": "TAUFIK SUSILO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2000-11-29",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 13,
        "id": "1912015",
        "name": "ZAINURROHMAN HIDAYAT WIJAYANTO",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1997-12-07",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 14,
        "id": "2001020",
        "name": "YAHYA HENDY RIZALDY",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2000-07-10",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 15,
        "id": "2012016",
        "name": "FEBRI SOLEKAH",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-02-25",
        "plant": "INJECT",
        "gender": "female"
       },
       {
        "no": 16,
        "id": "2012013",
        "name": "PRAYOGI SAPUTRA",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2001-06-05",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 17,
        "id": "2104017",
        "name": "VEBRIAN YUDIANTO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-02-01",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 18,
        "id": "2110025",
        "name": "ARDITYA RIFANGGA",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1994-04-15",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 19,
        "id": "2110022",
        "name": "DERRI RUSDIYANTO",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-09-18",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 20,
        "id": "2110018",
        "name": "DESI ANGJARWATI",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1997-12-24",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 21,
        "id": "2111006",
        "name": "AGUS WIDODO",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1992-02-07",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 22,
        "id": "2210020",
        "name": "KHOIRUL BEKTI SAPUTRO",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-04-04",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 23,
        "id": "2210023",
        "name": "WILLY DAFFA HILLMI ZAIN",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2003-07-16",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 24,
        "id": "2310029",
        "name": "MUHAMAD FIRMAN NURHADI",
        "position": "Manual & EDM Group Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-06-02",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 25,
        "id": "2311002",
        "name": "MUNAWIR NURUDIN",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1998-04-24",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 26,
        "id": "2311006",
        "name": "PUNGKY HENDRAWAN",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2002-12-29",
        "plant": "INJECT",
        "gender": "female"
       },
       {
        "no": 27,
        "id": "2308037",
        "name": "RIDHO WORO LARASATI",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2001-03-30",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 28,
        "id": 2405009,
        "name": "BAYU NUR ROMADHON",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-11-06",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 29,
        "id": "1907001",
        "name": "AGUS PRASETYO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-08-26",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 30,
        "id": "2205002",
        "name": "DANANG RIYANTO",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1993-12-22",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 31,
        "id": "2008009",
        "name": "VIVIAN NURUL FATIMAH",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1999-03-18",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 32,
        "id": "2111019",
        "name": "TUGIMIN",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1990-08-11",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 33,
        "id": "2311008",
        "name": "SITI FATIMAH",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2001-02-06",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 34,
        "id": "2311010",
        "name": "MUHAMAD MUHAIMIN",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2004-01-01",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 35,
        "id": "2312002",
        "name": "HESTI",
        "position": "Assembling & Printing Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-10-25",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 36,
        "id": "2412001",
        "name": "INDRA DWI PURNAMA JATI",
        "position": "Assembling & Printing Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2004-05-26",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 37,
        "id": "2209024",
        "name": "DINTA ADETYA",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2002-02-27",
        "plant": "INJECT",
        "gender": "female"
       },
       {
        "no": 38,
        "id": "2107008",
        "name": "FEBRIYANTO NUGROHO",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1997-02-23",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 39,
        "id": "2401001",
        "name": "DWIKI ERVAN SUSANTO",
        "position": "Production Material Operator",
        "level": "Operator",
        "date_of_birth": "1997-11-19",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 40,
        "id": "1812011",
        "name": "HERU HARTANTO",
        "position": "Production Material Operator",
        "level": "Operator",
        "date_of_birth": "1989-02-03",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 41,
        "id": "2010012",
        "name": "NUR ARIFIN",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1993-12-28",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 42,
        "id": "2010016",
        "name": "ROHMAT AGUNG SAPUTRO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1998-03-21",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 43,
        "id": "2010013",
        "name": "YOGA PRASETIYA",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1997-11-23",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 44,
        "id": "2010017",
        "name": "ANWAR ZAINAL ABIDIN",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-04-02",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 45,
        "id": "2301001",
        "name": "BENEDICTO YOGA DUTA NIRWANA",
        "position": "CNC Mold  Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-06-16",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 46,
        "id": "2307010",
        "name": "BAYU PRASETIYANTO",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1997-12-12",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 47,
        "id": "2410005",
        "name": "VIKI NURHIDAYAT",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-02-07",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 48,
        "id": "2410006",
        "name": "ANTONIUS ANDI PRASETYO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-10-03",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 49,
        "id": "2410007",
        "name": "ARBI ATMOKO",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-07-26",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 50,
        "id": "2104018",
        "name": "AFRIZAL SIAMTAMA",
        "position": "Assembling & Printing Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-11-11",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 51,
        "id": "2307021",
        "name": "TEGAR SETIA BUDI",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2003-09-26",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 52,
        "id": "2401010",
        "name": "RESTU ADI WIJAYA",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-02-11",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 53,
        "id": "2310030",
        "name": "FERRY ADE WIDIYATMOKO",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-06-14",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 54,
        "id": "1911029",
        "name": "IKA DERMIPARWANTI",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1996-12-16",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 55,
        "id": "1911034",
        "name": "YENNI FITRI APRILIAWATI",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1999-04-15",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 56,
        "id": "2010023",
        "name": "IQBAL RIZQI",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-02-21",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 57,
        "id": "2101021",
        "name": "WAWAN SUSETYA",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1996-05-05",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 58,
        "id": "2310037",
        "name": "KURNIAWATI ZAHRO",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-11-01",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 59,
        "id": "2402007",
        "name": "FUAD DWI SANTOSO",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1997-12-12",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 60,
        "id": "2101012",
        "name": "JULANG JATI KISWORO",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2000-01-20",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 61,
        "id": "2308032",
        "name": "ERWIN WIJAYANTO",
        "position": "Logistik Jogja Staff - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-09-27",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 62,
        "id": "2403029",
        "name": "YOGA EKA SAPUTRA",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-10-14",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 63,
        "id": "2103003",
        "name": "ANGGI PUTRA CAHYA PRATAMA",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-05-24",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 64,
        "id": "2101037",
        "name": "JANGKUNG SUYONO",
        "position": "CNC Mold  Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1996-08-26",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 65,
        "id": "2302006",
        "name": "YOKI WIHATMOKO",
        "position": "CNC Mold  Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-03-24",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 66,
        "id": "2401004",
        "name": "DENDI AGUSTIA PRATAMA",
        "position": "Tool Room 3 Staff - YPTI",
        "level": "Operator",
        "date_of_birth": "1998-08-10",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 67,
        "id": "2401005",
        "name": "FERDIANSYAH",
        "position": "Polish Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-09-13",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 68,
        "id": "2401008",
        "name": "PURWANTORO",
        "position": "Polish Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-07-11",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 69,
        "id": "2209008",
        "name": "ALIFA NUR HIDAYAH",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2003-11-27",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 70,
        "id": "2209009",
        "name": "INFANTRI ZAINAL ARIFIN",
        "position": "Group Production 5 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1996-05-25",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 71,
        "id": "2309003",
        "name": "IFA TIARANINGRUM",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2005-03-12",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 72,
        "id": "2106019",
        "name": "BAGAS SETYAWAN",
        "position": "Production Material Operator",
        "level": "Operator",
        "date_of_birth": "2001-08-16",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 73,
        "id": "2307009",
        "name": "KOMARI RIFAT BASA",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1993-06-28",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 74,
        "id": "2309015",
        "name": "TRI HARTANTO",
        "position": "Production Material Operator",
        "level": "Operator",
        "date_of_birth": "1997-03-20",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 75,
        "id": "2103022",
        "name": "BENI GUNAWAN PRASETIYO",
        "position": "Production Material Operator",
        "level": "Operator",
        "date_of_birth": "1996-01-18",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 76,
        "id": "2104009",
        "name": "THOYIB SUKRON FADHLULLOH",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-11-08",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 77,
        "id": "2012036",
        "name": "MUHAMAD RISQI NURACHSIN",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-04-06",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 78,
        "id": "2002004",
        "name": "AVRIAN NUGROHO PRASETYO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-04-21",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 79,
        "id": "2101014",
        "name": "IKANG RAYNARDHI FERDIAN",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1992-04-24",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 80,
        "id": "2012019",
        "name": "FEBRIYANTO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1994-11-01",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 81,
        "id": "2104025",
        "name": "TRI YULIANTA",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1998-07-12",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 82,
        "id": "1809009",
        "name": "IKHSAN ARIF USMANTO",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-05-20",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 83,
        "id": "2111001",
        "name": "DIDIK SUGIYANTO",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1995-06-11",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 84,
        "id": "2111005",
        "name": "AGUS SURYONO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1996-08-06",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 85,
        "id": "2210009",
        "name": "MUHAMMAD RAIHAN RIFAI",
        "position": "Assembling Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-07-04",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 86,
        "id": "2111007",
        "name": "ANDHIKA BAGAS SETIAWAN",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1995-06-15",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 87,
        "id": "2111008",
        "name": "CYRILLUS EDWIN NUGROHO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2002-03-19",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 88,
        "id": "2101052",
        "name": "ADITYA NUGROHO",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1999-07-16",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 89,
        "id": "2210022",
        "name": "MARTINUS NOVIAN HARTADI",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1997-11-11",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 90,
        "id": "2304003",
        "name": "RIZAL ADI ANGGARA",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-03-06",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 91,
        "id": "2303010",
        "name": "MUADZ HAMAMI",
        "position": "Manual & EDM Group Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2002-07-18",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 92,
        "id": "2410002",
        "name": "ISMAIL NUR ADZAN",
        "position": "CNC Mold Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2005-01-20",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 93,
        "id": "2008014",
        "name": "AGUS RIANTO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1992-08-01",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 94,
        "id": "2008013",
        "name": "KRISDIYANTO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1998-09-27",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 95,
        "id": "2106005",
        "name": "VICKY OKTAVIANTO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1998-10-27",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 96,
        "id": "2105009",
        "name": "THOFIK ARDI NUGROHO",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-02-13",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 97,
        "id": "2205010",
        "name": "ENDRI VASTRIO",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1996-09-16",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 98,
        "id": "2205011",
        "name": "OKI AYIS SAPUTRA",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-11-10",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 99,
        "id": "2212001",
        "name": "ISTOFA ANNAS",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2003-05-30",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 100,
        "id": "2404004",
        "name": "FELINDA ISNAINI NUR AISYAH",
        "position": "Polish Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-10-12",
        "plant": "MOLD",
        "gender": "female"
       },
       {
        "no": 101,
        "id": "2308038",
        "name": "ALFIAN RAHMADHAN WAHYU P",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2004-10-16",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 102,
        "id": "2403038",
        "name": "ALFIN ZANITRA",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1995-01-13",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 103,
        "id": "2106001",
        "name": "BAMA SUROSO HADI KUSUMA",
        "position": "Tool Room 3 Staff - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-09-06",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 104,
        "id": "2306002",
        "name": "FARIS ROMANDA",
        "position": "Polish Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2005-06-20",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 105,
        "id": "2306003",
        "name": "HARYADI TRI SAPUTRA",
        "position": "CNC Mold  Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1998-01-30",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 106,
        "id": "2106018",
        "name": "ARIEF YULIANTO",
        "position": "Production Material Operator",
        "level": "Operator",
        "date_of_birth": "1997-07-09",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 107,
        "id": "2107003",
        "name": "ARI SULISTIYO",
        "position": "Assembling & Printing Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2003-05-01",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 108,
        "id": "2107005",
        "name": "RIZKY EKO BUDIANTO",
        "position": "Assembling & Printing Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2003-03-24",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 109,
        "id": "2107010",
        "name": "FEBRI FARHA WIJAYANTO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-02-02",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 110,
        "id": "2107011",
        "name": "ADI FEBRIYANTO",
        "position": "Assembling & Printing Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2003-02-10",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 111,
        "id": "2112009",
        "name": "FEBRY KURNIAWAN",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1997-02-27",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 112,
        "id": "2208018",
        "name": "TRI YULIANTO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-07-31",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 113,
        "id": "2307020",
        "name": "SUPRIHATIN",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1991-12-07",
        "plant": "INJECT",
        "gender": "female"
       },
       {
        "no": 114,
        "id": "2308006",
        "name": "AHNAF RIZKY PRATAMA",
        "position": "Group Production 3 Operator - YPTS ",
        "level": "Operator",
        "date_of_birth": "2005-06-11",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 115,
        "id": "2308005",
        "name": "ADIT SETYAWAN",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-07-06",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 116,
        "id": "2308008",
        "name": "ALDO USMANSYAH",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-11-12",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 117,
        "id": "2308015",
        "name": "DUTA CANDRA DINATA",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-09-23",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 118,
        "id": "2209004",
        "name": "IGNATIUS ANGGA PUTRA ADI WIBOWO",
        "position": "CNC Mold  Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-07-06",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 119,
        "id": "2308016",
        "name": "FATKA FAUZI FATURAHMAN",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-11-21",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 120,
        "id": "2308019",
        "name": "HENDRA TRI PRASETYA",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-12-08",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 121,
        "id": "2308021",
        "name": "MUHAMAD ANDI SAPUTRA",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1999-09-30",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 122,
        "id": "2308022",
        "name": "MUHAMMAD APRILIAN TRI PAMUNGKAS",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-04-16",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 123,
        "id": "2308024",
        "name": "RIFAN SETYAWAN",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2004-09-14",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 124,
        "id": "2308025",
        "name": "TEGUH AMIN PRANNATA",
        "position": "Production Group 2 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-12-09",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 125,
        "id": "2308035",
        "name": "EDI SAPUTRO",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1993-09-18",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 126,
        "id": "2407005",
        "name": "ADITIYA NUR WIDIANTO",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1998-03-08",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 127,
        "id": "2209015",
        "name": "FAJAR AGUS PRAYOGO",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-08-27",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 128,
        "id": "2411005",
        "name": "SUPRIHATIN",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1988-01-01",
        "plant": "INJECT",
        "gender": "female"
       },
       {
        "no": 129,
        "id": "2411004",
        "name": "YOGY ANDIKA APRIANTO",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-04-27",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 130,
        "id": "2402012",
        "name": "AKBAR APRIYANTO",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1998-03-24",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 131,
        "id": "2011016",
        "name": "Firda Yulita",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2000-07-11",
        "plant": "YPTS",
        "gender": "female"
       },
       {
        "no": 132,
        "id": "2209016",
        "name": "RIGEN PRASETYO",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2001-01-14",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 133,
        "id": "2103006",
        "name": "MUH NUR YAMAN",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1998-01-06",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 134,
        "id": "2301004",
        "name": "MUHAMAD SAIFUL TABAH",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1997-03-01",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 135,
        "id": "2307007",
        "name": "MUHAMMAD FATHUR RAHMAN",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1999-08-14",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 136,
        "id": "2307011",
        "name": "DONI ARI NUGROHO",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1996-09-20",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 137,
        "id": "2103013",
        "name": "NUR SAHID",
        "position": "Production Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1992-11-05",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 138,
        "id": "2104008",
        "name": "MUHAMMAD ENDAR BUDIARTO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-01-28",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 139,
        "id": "2110003",
        "name": "MUHAMMAD ADITYA FEBRI NUGROHO",
        "position": "Group Production 3 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2001-02-04",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 140,
        "id": "2110004",
        "name": "ISKAK WIDARTO",
        "position": "Production Group 4 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1991-12-12",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 141,
        "id": "2209021",
        "name": "AAN BAGUS SAPUTRO",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2004-06-07",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 142,
        "id": "2210011",
        "name": "NANANG ARJUNA",
        "position": "Group Production 6 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1999-05-24",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 143,
        "id": "2210003",
        "name": "LILIK SETIAWAN",
        "position": "Group Production 1 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "1993-09-16",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 144,
        "id": "2210008",
        "name": "MAULANA AHMAD FAUDZAN",
        "position": "Quality Control Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-04-04",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 145,
        "id": "2309008",
        "name": "RISKA WAHYU SAPUTRO",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-04-17",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 146,
        "id": "2309018",
        "name": "ISMA NUR ASROFI",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2005-03-01",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 147,
        "id": "0807001",
        "name": "INDAH JUMIYATI",
        "position": "Polish Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1980-09-22",
        "plant": "MOLD",
        "gender": "female"
       },
       {
        "no": 148,
        "id": "1010001",
        "name": "DIDIK PRASETYO",
        "position": "Assembling Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1982-06-29",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 149,
        "id": "1211001",
        "name": "ANDI FEBRIANTORO",
        "position": "Assembling Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1993-02-07",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 150,
        "id": "1306001",
        "name": "SURATMAN",
        "position": "Quality Control Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1994-07-18",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 151,
        "id": "1504004",
        "name": "FRANSISCUS FENDI YUDHA KURNIAWAN",
        "position": "Assembling Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1995-01-27",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 152,
        "id": "1702003",
        "name": "RINI",
        "position": "Production Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1983-11-10",
        "plant": "INJECT",
        "gender": "female"
       },
       {
        "no": 153,
        "id": "1802003",
        "name": "DISKA KURNIAWAN",
        "position": "Assembling Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1997-12-15",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 154,
        "id": "1807009",
        "name": "KEFIN HADIWIJAYA",
        "position": "Assembling Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-12-21",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 155,
        "id": "1910020",
        "name": "BRITO KUSUMA",
        "position": "Assembling Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1996-05-13",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 156,
        "id": "2001021",
        "name": "ABDUL AZIS SAIFUDIN",
        "position": "CNC Mold  Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2000-04-20",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 157,
        "id": "2001022",
        "name": "DWI DARMAWAN",
        "position": "CNC Mold  Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1996-12-11",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 158,
        "id": "2004003",
        "name": "CHOIRUL ANWAR SIDIK",
        "position": "CNC Mold  Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-06-14",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 159,
        "id": "2004005",
        "name": "KRISNA SUKMA DEWA",
        "position": "CNC Mold  Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1998-01-08",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 160,
        "id": "2101035",
        "name": "GUNAWAN DWIANTORO",
        "position": "Tool Room 3 Staff - YPTI",
        "level": "Operator",
        "date_of_birth": "2002-06-11",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 161,
        "id": "2101039",
        "name": "WAHYU HARTANTA",
        "position": "Manual & EDM Group Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1996-12-17",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 162,
        "id": "2107012",
        "name": "MEKY HAJID PRIHATIN",
        "position": "CNC Mold  Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1999-03-05",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 163,
        "id": "2109008",
        "name": "FAJAR HIRLAN TRI SEPTYAN",
        "position": "Assembling Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2002-09-09",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 164,
        "id": "2109005",
        "name": "MOHAMMAD RASYID",
        "position": "CNC Mold  Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2002-09-06",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 165,
        "id": "2109012",
        "name": "RAHMAT DWI NUGROHO",
        "position": "CNC Mold  Group 1 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2002-12-03",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 166,
        "id": "2111033",
        "name": "MUHAMMAD DIMAS NUGROHO",
        "position": "Manual & EDM Group Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2003-06-09",
        "plant": "MOLD"
       },
       {
        "no": 167,
        "id": "2201004",
        "name": "LUTFI INDRI ASTUTI",
        "position": "Polish Mold Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "2001-05-13",
        "plant": "MOLD",
        "gender": "male"
       },
       {
        "no": 168,
        "id": "2501005",
        "name": "M FATHONI HENDRA GUNAWAN",
        "position": "Production Group 3 Operator - YPTI\t",
        "level": "Operator",
        "date_of_birth": "2003-02-24",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 169,
        "id": "2501007",
        "name": "ILYAS AZIS NUROHMAN",
        "position": "Production Group 3 Operator - YPTI\t",
        "level": "Operator",
        "date_of_birth": "2003-05-14",
        "plant": "INJECT",
        "gender": "male"
       },
       {
        "no": 170,
        "id": "2501006",
        "name": "HABIEB KHAIRUTSANI SURURI",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2002-09-04",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 171,
        "id": "2412010",
        "name": "RIDHO ARDIYANTO",
        "position": "Group Production 2 Operator - YPTS",
        "level": "Operator",
        "date_of_birth": "2003-04-01",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 172,
        "id": "2412011",
        "name": "RYAN DIO YUNANTA ",
        "position": "Group Production 3 Operator - YPTS ",
        "level": "Operator",
        "date_of_birth": "2000-05-05",
        "plant": "YPTS",
        "gender": "male"
       },
       {
        "no": 173,
        "id": "2109006",
        "name": "RULI ANAN TASYA",
        "position": "CNC Mold  Group 3 Operator - YPTI",
        "level": "Operator",
        "date_of_birth": "1998-08-25",
        "plant": "MOLD",
        "gender": "male"
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