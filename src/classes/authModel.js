import Models from "./classModel";
import { ValidationError, NotFoundError, ServerError, UnauthorizedError } from "./classRespons"
import sch from "../schemas/users";
import Schools from "../schemas/schools"
import { signer } from "../middlewares/authMiddleware";
import { deserializeUser } from "passport";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import { createDefaultWellnessDetail } from "../helpers/masterFunction"

class authModel extends Models{
    constructor(){
        super(sch)
    }

    async register(body, useragent) {
        console.log({body, useragent})
        const { browser, version, os, platform, source } = useragent

        const user = await this.model.findOne({ nisn: body.nisn })
        if(user) throw new NotFoundError('NISN sudah terdaftar!')

        const school = await Schools.findOne({ npsn: body.school_npsn })
        if(!school) throw new NotFoundError('NPSN sekolah tidak ditemukan!')

        let pinHash = await bcrypt.hash(body.pin + process.env.SALT, 10);
        
        const ug = {
            browser : browser,
            version : version,
            os : os,
            platform : platform,
            source : source
        }

        const resp = await this.model.create({ ...body, pin: pinHash, user_agent: ug, school_id: school._id })
        if(body.role == 'user') await createDefaultWellnessDetail(resp)
        if(!resp) throw new ServerError('Gagal register!')
        
        return { msg: 'Register Success.', data: { nisn: resp.nisn, pin: body.pin, name: resp.name }}
    }

    async login(body) {
        // console.log({body})
        let user = await this.model.findOne({nisn: body.nisn})
        // console.log({user})
        if (!user) throw new NotFoundError('NISN tidak ditemukan!')
        if (user.status == 'inactive') throw new NotFoundError('Akun anda sudah tidak aktif!')
        if (user.status == 'suspend') throw new NotFoundError('Akun anda dibekukan! Silahkan hubungi admin.')
        user.isOnline = true
        await user.save()
        
        var payload = {
            _id: user._id,
            nisn: user.nisn,
            name: user.name,
            role: user.role,
            status: user.status,
            gender: user.gender,
            school_id: (user.school_id != null) ? user.school_id._id : null,
            date_of_birth: (user.date_of_birth != null) ? user.date_of_birth : null,
            last_login: user.last_login,
            total_login: user.total_login,

        }
        // console.log({payload})
        const isMatch = await bcrypt.compare(body.pin + process.env.SALT, user.pin)
        if (!isMatch) throw new ValidationError('PIN salah!')

        const token = await signer(payload)
        // console.log({token})
        payload.token = token

        user.total_login += 1
        user.last_login = moment()
        await user.save()

        return { msg: 'Login Success.', data:payload }

    }

    async logout(req, user_id) {
        let user = await this.model.findOne({ _id: user_id })
        user.isOnline = false
        await user.save()

        delete req.session.online;

        return { msg: 'Logout Success.', data: {_id: user._id, name: user.name} }

    }

    async updatePin(body, user_id) {
        // console.log({body, user_id})
        let pinHash = await bcrypt.hash(body.newPassword + process.env.SALT, 10);

        let user = await this.model.findOne({ _id: user_id })
        user.pin = pinHash
        await user.save()

        return { msg: 'Update PIN Success.', data: {_id: user._id, name: user.name} }

    }

}

module.exports=authModel