import Models from "./classModel";
import { ValidationError, NotFoundError, ServerError, UnauthorizedError } from "./classRespons"
import sch from "../schemas/users";
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

        const user = await this.model.findOne({ email: body.email })
        if(user) throw new NotFoundError('Email has been registered!')

        // const school = await Schools.findOne({ npsn: body.school_npsn })
        // if(!school) throw new NotFoundError('NPSN sekolah tidak ditemukan!')

        let passwordHash = await bcrypt.hash(body.password + process.env.SALT, 10);
        
        const ug = {
            browser : browser,
            version : version,
            os : os,
            platform : platform,
            source : source
        }

        const resp = await this.model.create({ ...body, password: passwordHash, user_agent: ug })
        if(!resp) throw new ServerError('Failed to register!')
        
        return { msg: 'Register Success.', data: { email: resp.email, name: resp.name }}
    }

    async login(body) {
        // console.log({body})
        const identifier = body.email
        let user = await this.model.findOne({$or: [{ email: identifier }, { phone: identifier }]})
        // console.log({user})
        if (!user) throw new NotFoundError('Email not found!')
        if (user.status == 'inactive') throw new NotFoundError('Your account is inactive!')
        if (user.status == 'suspend') throw new NotFoundError('Your account has been suspended!')
        user.isOnline = true
        await user.save()
        
        var payload = {
            _id: user._id,
            name: user.name,
            role: user.role,
            email: user.email,
            status: user.status

        }
        console.log({payload})
        const isMatch = await bcrypt.compare(body.password + process.env.SALT, user.password)
        if (!isMatch) throw new ValidationError('Wrong password!')

        const token = await signer(payload)
        // console.log({token})
        payload.token = token
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