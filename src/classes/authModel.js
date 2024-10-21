import Models from "./classModel";
import { ValidationError, NotFoundError, ServerError, UnauthorizedError } from "./classRespons"
import sch from "../schemas/users";
import Schools from "../schemas/schools"
import { signer } from "../middlewares/authMiddleware";
import { deserializeUser } from "passport";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";

class authModel extends Models{
    constructor(){
        super(sch)
    }

    async register(body, useragent) {
        const { browser, version, os, platform, source } = useragent
        const school = await Schools.findOne({ npsn: body.school_npsn })
        if(!school) throw new NotFoundError('School Not Found')

        let pinHash = await bcrypt.hash(body.pin + process.env.SALT, 10);
        
        const ug = {
            browser : browser,
            version : version,
            os : os,
            platform : platform,
            source : source
        }

        const resp = await this.model.create({ ...body, pin: pinHash, user_agent: ug, school_id: school._id })
        if(!resp) throw new ServerError('Cannot Create Data')
        
        return { msg: 'Register Success.', data: { nisn: resp.nisn, pin: body.pin, name: resp.name }}
    }

    async login(body) {
        // console.log({body})
        let user = await this.model.findOne({nisn: body.nisn})
        console.log({user})
        if (!user) throw new NotFoundError('NISN Not Found')
        if (user.status == 'inactive') throw new NotFoundError('Your Account is inactive')
        
        var payload = {
            _id: user._id,
            nisn: user.nisn,
            name: user.name,
            role: user.role,
            status: user.status,
            last_login: user.last_login,
            total_login: user.total_login
        }
        // console.log({payload})
        const isMatch = await bcrypt.compare(body.pin + process.env.SALT, user.pin)
        if (!isMatch) throw new ValidationError('Incorect Pin!')

        const token = await signer(payload)
        console.log({token})
        payload.token = token

        user.total_login += 1
        user.last_login = moment()
        await user.save()

        return { msg: 'Login Success.', data:payload }

    }

}

module.exports=authModel